import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'super-secret-jwt-key';

let db;
async function initializeDb() {
  db = await open({
    filename: path.join(__dirname, 'neon_hw.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sku TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT,
      features_json TEXT
    );
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(product_id) REFERENCES products(id)
    );
  `);

  const count = await db.get('SELECT COUNT(*) as count FROM products');
  if (count.count === 0) {
    console.log("Seeding AI Hardware database...");
    const MOCK_DATA = [
      { name: "AX-900 Tensor Core", sku: "NPU-AX900", description: "Flagship neural processor featuring 144 tensor cores.", price: 4299.00, category: "AI Accelerators", image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhmVRJeNc4pPhifvOHq0kfomXnvFVQ6RhRe_2Ne3NtMp_bU-lDevQyuOSTDgOeo7AVwEjJv62bFSvg57_-Y5pUMS88rp3rWFRNFWMZsckAzvUMxmHp804NxJRU-qAtIkU-dd67bCH3KD8CT20SH7gJJDXRDnKVapWmyAtKOTKVbskfafd8vG9lBDnufjXXWwOu9NdGGUwdhFTr0X8ljc_43gKzZJF68CzgAM12ULtKUGM5TgHXONMdhKmOnHrc47SVUxM5vb3sOYRA", features: { FLOPS: "1.2 PFLOPS", TDP: "350W" } },
      { name: "NeuroBlade v2", sku: "NPU-NB2", description: "Edge-optimized accelerator blade.", price: 899.00, category: "AI Accelerators", image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsKv5OGoBl19HVHxO8F-OJQWzU6-yGf7YIOpIhSegCKdv1xikQEecMR4Kyq4oUfH-XiPdLFyhrT4Are5Pb10IuJR7wpcVOFWB3NlvaclRlT_7_w6RR-JbORMJcQ4Y6NatAb56MHtWZ7ExS-RuVAvNf8SMwrLQxC7pLHulxEehvgQbjKpkUk7O61WsOMw9q_kSkKts7oVQrP1CSdCHdLVPhSGFncbQzlPismwIaI4sUg7HLEM1VFg2tUrNAGyojUeYIFWsPgzjCDzvx", features: { TOPS: "250 TOPS", TDP: "45W" } },
      { name: "Quantum-Cell Prototype X", sku: "QC-PTX", description: "Experimental non-von Neumann architecture.", price: 12500.00, category: "Quantum Cells", features: { Architecture: "Analog Crossbar", Status: "Early Access" } },
      { name: "EdgeInference E-1", sku: "NPU-E1", description: "Ultra-low power NPU for IoT devices.", price: 149.00, category: "AI Accelerators", features: { TOPS: "15 TOPS", TDP: "2W" } },
      { name: "Cryo-Cooling Module", sku: "LC-CM1", description: "Liquid nitrogen cooling subsystem for overclocked TPUs.", price: 599.00, category: "Liquid Cooling", features: { "Cooling Capacity": "1000W" } },
      { name: "Synaptic Bridge", sku: "INT-SB1", description: "High-bandwidth interconnect for linking multiple NPUs.", price: 299.00, category: "Interfaces", features: { Bandwidth: "900 GB/s" } },
      { name: "DeepMind TPU v5e (Refurb)", sku: "TPU-V5E-R", description: "Refurbished TPU v5e providing cost-effective training capability.", price: 2500.00, category: "Core Modules", features: { FLOPS: "393 TFLOPS" } },
      { name: "Isotope Power Cell", sku: "PWR-ISO", description: "Continuous reliable power delivery for isolated compute nodes.", price: 1800.00, category: "Power Cells", features: { Output: "500W Continuous" } },
      { name: "Vision-Processing Unit VPU-4", sku: "VPU-400", description: "Dedicated vision processing unit for autonomous robotics.", price: 450.00, category: "AI Accelerators", features: { Interface: "MIPI CSI-2" } },
      { name: "PCIe Gen 6 Riser", sku: "INT-PCIE6", description: "Next-gen riser cable for external AI accelerator mounting.", price: 89.00, category: "Interfaces", features: { Protocol: "PCIe 6.0" } },
      { name: "Neural-Link Hub", sku: "NL-HUB", description: "Central networking hub for distributed AI clusters.", price: 1200.00, category: "Core Modules", features: { Ports: "16x 400GbE" } },
      { name: "Submersion Cooling Tank", sku: "LC-TANK", description: "Dielectric fluid submersion tank for entire blade servers.", price: 3500.00, category: "Liquid Cooling", features: { Capacity: "4 Blades" } },
      { name: "Quantum Entanglement Node", sku: "QC-NODE", description: "Node unit for forming a quantum processing grid.", price: 25000.00, category: "Quantum Cells", features: { Qubits: "16" } },
      { name: "Micro-Fusion Reactor Cell", sku: "PWR-FUSE", description: "Experimental compact energy generation for remote AI outposts.", price: 50000.00, category: "Power Cells", features: { Output: "50kW" } },
      { name: "Logic Analyzer Toolset", sku: "INT-LAT", description: "Hardware logic analysis for debugging neural pathways.", price: 600.00, category: "Interfaces", features: { Channels: "128" } }
    ];
    for (const p of MOCK_DATA) {
      await db.run('INSERT INTO products (name, sku, description, price, category, image_url, features_json) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [p.name, p.sku, p.description, p.price, p.category, p.image_url || null, JSON.stringify(p.features || {})]);
    }
  }
}

// Authentication middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const dec = jwt.verify(token, JWT_SECRET);
    req.user_id = dec.id;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};

app.get('/api/products', async (req, res) => {
  const products = await db.all('SELECT * FROM products');
  const mapped = products.map(p => ({ ...p, features: JSON.parse(p.features_json || '{}') }));
  res.json(mapped);
});

initializeDb().then(() => {
  app.listen(8080, () => {
    console.log(`Backend Server API running on port 8080`);
  });
});

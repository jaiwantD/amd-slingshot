import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CartSlideOut from './components/CartSlideOut';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { FilterProvider, useFilter } from './context/FilterContext';

const AMD_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg";

const MOCK_DATA = [
      { id: 1, name: "AX-900 Tensor Core", sku: "NPU-AX900", description: "Flagship neural processor featuring 144 tensor cores.", price: 4299.00, category: "AI Accelerators", image_url: AMD_LOGO_URL, features: { FLOPS: "1.2 PFLOPS", TDP: "350W" } },
      { id: 2, name: "NeuroBlade v2", sku: "NPU-NB2", description: "Edge-optimized accelerator blade.", price: 899.00, category: "AI Accelerators", image_url: AMD_LOGO_URL, features: { TOPS: "250 TOPS", TDP: "45W" } },
      { id: 3, name: "Quantum-Cell Prototype X", sku: "QC-PTX", description: "Experimental non-von Neumann architecture.", price: 12500.00, category: "Quantum Cells", image_url: AMD_LOGO_URL, features: { Architecture: "Analog Crossbar", Status: "Early Access" } },
      { id: 4, name: "EdgeInference E-1", sku: "NPU-E1", description: "Ultra-low power NPU for IoT devices.", price: 149.00, category: "AI Accelerators", image_url: AMD_LOGO_URL, features: { TOPS: "15 TOPS", TDP: "2W" } },
      { id: 5, name: "Cryo-Cooling Module", sku: "LC-CM1", description: "Liquid nitrogen cooling subsystem for overclocked TPUs.", price: 599.00, category: "Liquid Cooling", image_url: AMD_LOGO_URL, features: { "Cooling Capacity": "1000W" } },
      { id: 6, name: "Synaptic Bridge", sku: "INT-SB1", description: "High-bandwidth interconnect for linking multiple NPUs.", price: 299.00, category: "Interfaces", image_url: AMD_LOGO_URL, features: { Bandwidth: "900 GB/s" } },
      { id: 7, name: "DeepMind TPU v5e (Refurb)", sku: "TPU-V5E-R", description: "Refurbished TPU v5e providing cost-effective training capability.", price: 2500.00, category: "Core Modules", image_url: AMD_LOGO_URL, features: { FLOPS: "393 TFLOPS" } },
      { id: 8, name: "Isotope Power Cell", sku: "PWR-ISO", description: "Continuous reliable power delivery for isolated compute nodes.", price: 1800.00, category: "Power Cells", image_url: AMD_LOGO_URL, features: { Output: "500W Continuous" } },
      { id: 9, name: "Vision-Processing Unit VPU-4", sku: "VPU-400", description: "Dedicated vision processing unit for autonomous robotics.", price: 450.00, category: "AI Accelerators", image_url: AMD_LOGO_URL, features: { Interface: "MIPI CSI-2" } },
      { id: 10, name: "PCIe Gen 6 Riser", sku: "INT-PCIE6", description: "Next-gen riser cable for external AI accelerator mounting.", price: 89.00, category: "Interfaces", image_url: AMD_LOGO_URL, features: { Protocol: "PCIe 6.0" } },
      { id: 11, name: "Neural-Link Hub", sku: "NL-HUB", description: "Central networking hub for distributed AI clusters.", price: 1200.00, category: "Core Modules", image_url: AMD_LOGO_URL, features: { Ports: "16x 400GbE" } },
      { id: 12, name: "Submersion Cooling Tank", sku: "LC-TANK", description: "Dielectric fluid submersion tank for entire blade servers.", price: 3500.00, category: "Liquid Cooling", image_url: AMD_LOGO_URL, features: { Capacity: "4 Blades" } },
      { id: 13, name: "Quantum Entanglement Node", sku: "QC-NODE", description: "Node unit for forming a quantum processing grid.", price: 25000.00, category: "Quantum Cells", image_url: AMD_LOGO_URL, features: { Qubits: "16" } },
      { id: 14, name: "Micro-Fusion Reactor Cell", sku: "PWR-FUSE", description: "Experimental compact energy generation for remote AI outposts.", price: 50000.00, category: "Power Cells", image_url: AMD_LOGO_URL, features: { Output: "50kW" } },
      { id: 15, name: "Logic Analyzer Toolset", sku: "INT-LAT", description: "Hardware logic analysis for debugging neural pathways.", price: 600.00, category: "Interfaces", image_url: AMD_LOGO_URL, features: { Channels: "128" } }
];

function AppContent() {
  const { activeCategory, searchQuery, compatibility, clearFilters, setActiveCategory } = useFilter();

  const filteredProducts = MOCK_DATA.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <CartSlideOut />
      <div className="flex-1 flex max-w-[1920px] mx-auto w-full relative">
        <Sidebar />
        <main className="flex-1 lg:ml-72 p-8 lg:p-12 bg-surface min-h-screen">
          <nav aria-label="Breadcrumb" className="flex text-sm text-on-surface-variant font-body mb-8">
            <ol className="flex items-center space-x-2">
              <li><a className="hover:text-on-surface transition-colors focus:ring-2 focus:ring-secondary focus:outline-none" href="#" onClick={(e) => {e.preventDefault(); clearFilters();}}>Home</a></li>
              <li><span className="material-symbols-outlined text-[16px]">chevron_right</span></li>
              <li><span aria-current="page" className="text-secondary font-medium">{activeCategory || "All Hardware"}</span></li>
            </ol>
          </nav>

          <header className="mb-16 relative">
            <div className="max-w-3xl">
              <h1 className="font-headline text-5xl lg:text-7xl font-bold tracking-tighter text-on-surface mb-6 leading-[0.9]">
                {activeCategory ? activeCategory.toUpperCase() : "HARDWARE"} <span className="thermal-text">ARCHITECTURES</span>
              </h1>
              <p className="text-lg text-on-surface-variant font-body max-w-xl leading-relaxed">
                 Next-generation components mapped to your current filter metrics.
              </p>
            </div>
            <div className="absolute -right-20 top-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
          </header>

          <div className="flex flex-wrap gap-3 mb-8">
            {activeCategory && (
                <div className="bg-surface-variant px-3 py-1.5 rounded-sm flex items-center gap-2 text-xs font-body ghost-border">
                  <span>Architecture: {activeCategory}</span>
                  <button aria-label="Remove filter" onClick={() => setActiveCategory(null)} className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
            )}
            {searchQuery && (
                 <div className="bg-surface-variant px-3 py-1.5 rounded-sm flex items-center gap-2 text-xs font-body ghost-border">
                 <span>Query: {searchQuery}</span>
                 <button aria-label="Remove search" onClick={clearFilters} className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary">
                   <span className="material-symbols-outlined text-[14px]">close</span>
                 </button>
               </div>
            )}
            {(activeCategory || searchQuery || compatibility.neuralOS || compatibility.quantumBridge) && (
              <button aria-label="Clear all filters" onClick={clearFilters} className="text-secondary text-xs font-medium hover:underline ml-2 focus:outline-none focus:ring-2 focus:ring-secondary">Clear All</button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <p className="text-on-surface-variant col-span-3">No hardware found matching your criteria.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </FilterProvider>
    </AuthProvider>
  );
}

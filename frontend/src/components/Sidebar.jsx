import React from 'react';
import { useFilter } from '../context/FilterContext';

export default function Sidebar() {
  const { activeCategory, setActiveCategory, compatibility, toggleCompatibility } = useFilter();

  const categories = [
      { name: "AI Accelerators", icon: "memory" },
      { name: "Liquid Cooling", icon: "ac_unit" },
      { name: "Core Modules", icon: "developer_board" },
      { name: "Power Cells", icon: "battery_charging_full" },
      { name: "Interfaces", icon: "settings_input_component" },
      { name: "Quantum Cells", icon: "science" }
  ];

  return (
    <aside aria-label="Sidebar Filters" className="bg-neutral-950/20 backdrop-blur-2xl font-['Space_Grotesk'] text-sm uppercase tracking-widest h-screen w-72 fixed left-0 top-20 bg-neutral-900 flat hidden lg:flex flex-col gap-4 p-6 z-40 border-r border-white/5">
      <div className="mb-8">
        <h2 className="text-[#ff8e83] font-bold text-lg mb-1 tracking-tight">FILTER_MATRIX</h2>
        <p className="text-neutral-400 text-xs normal-case tracking-normal">Precision Hardware Selection</p>
      </div>
      <nav className="flex flex-col gap-2">
        {categories.map(cat => (
             <a 
                key={cat.name}
                aria-current={activeCategory === cat.name ? "page" : undefined} 
                onClick={(e) => { e.preventDefault(); setActiveCategory(cat.name); }}
                className={`flex items-center gap-3 px-4 py-3 ease-in-out duration-300 border-l-4 cursor-pointer focus:outline-none focus:bg-white/5 focus:text-white ${
                    activeCategory === cat.name 
                        ? "text-[#fd8b00] font-bold border-[#fd8b00] bg-white/5" 
                        : "text-neutral-400 hover:bg-white/5 hover:text-white border-transparent"
                }`} 
                href="#"
             >
             <span className="material-symbols-outlined text-[20px]" style={activeCategory === cat.name ? { fontVariationSettings: "'FILL' 1" } : {}}>{cat.icon}</span>
             {cat.name}
           </a>
        ))}
      </nav>
      <div className="mt-auto pt-8 border-t border-white/5">
        <h3 className="text-xs text-on-surface-variant mb-4 font-bold">COMPATIBILITY</h3>
        <div className="flex flex-col gap-3 font-body text-xs normal-case tracking-normal">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
                checked={compatibility.neuralOS}
                onChange={() => toggleCompatibility('neuralOS')}
                className="rounded-sm bg-surface-container-highest border-outline-variant text-secondary focus:ring-secondary focus:ring-offset-surface focus:ring-2 focus:outline-none" 
                type="checkbox"
            />
            <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Neural OS v4.2+</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
                checked={compatibility.quantumBridge}
                onChange={() => toggleCompatibility('quantumBridge')}
                className="rounded-sm bg-surface-container-highest border-outline-variant text-secondary focus:ring-secondary focus:ring-offset-surface focus:ring-2 focus:outline-none" 
                type="checkbox"
            />
            <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Quantum Bridge Ready</span>
          </label>
        </div>
      </div>
    </aside>
  );
}

import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFilter } from '../context/FilterContext';

export default function Navbar() {
  const { cartItems, toggleCart } = useCart();
  const { user, login, logout } = useAuth();
  const { searchQuery, setSearchQuery, setActiveCategory } = useFilter();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (e, category) => {
    e.preventDefault();
    setActiveCategory(category);
  };

  return (
    <nav aria-label="Main Navigation" className="bg-neutral-900/40 backdrop-blur-3xl font-['Space_Grotesk'] tracking-tight sticky top-0 w-full z-50 border-b border-white/10 shadow-[0_8px_32px_0_rgba(255,255,255,0.04)]">
      <div className="flex justify-between items-center px-8 h-20 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-12">
          <a aria-label="NEON_LABS Home" onClick={(e) => handleNavClick(e, null)} className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff8e83] to-[#fd8b00] cursor-pointer" href="#">NEON_LABS</a>
          <div className="hidden md:flex items-center gap-8">
            <a onClick={(e) => handleNavClick(e, "AI Accelerators")} className="text-white/70 hover:text-white transition-all duration-300 hover:bg-white/5 scale-95 duration-200 px-3 py-2 rounded-DEFAULT cursor-pointer" href="#">Processors</a>
            <a onClick={(e) => handleNavClick(e, "Interfaces")} className="text-white/70 hover:text-white transition-all duration-300 hover:bg-white/5 scale-95 duration-200 px-3 py-2 rounded-DEFAULT cursor-pointer" href="#">Neural-Links</a>
            <a onClick={(e) => handleNavClick(e, "Quantum Cells")} className="text-white/70 hover:text-white transition-all duration-300 hover:bg-white/5 scale-95 duration-200 px-3 py-2 rounded-DEFAULT cursor-pointer" href="#">Quantum-Cells</a>
            <a className="text-white/70 hover:text-white transition-all duration-300 hover:bg-white/5 scale-95 duration-200 px-3 py-2 rounded-DEFAULT cursor-pointer" href="#">About</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input 
              aria-label="Search" 
              className="bg-surface-container-highest border-none rounded-sm py-2 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-secondary w-64 transition-shadow focus:outline-none" 
              placeholder="Search catalog..." 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button aria-label="Shopping Cart" onClick={toggleCart} className="relative text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm p-1">
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-on-primary-fixed text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <div className="relative group">
               <button aria-label={user ? `Logged in as ${user.username}` : "Log in"} onClick={() => user ? logout() : login("guest_admin")} className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm p-1 flex items-center gap-2">
                 <span className="material-symbols-outlined">{user ? "how_to_reg" : "account_circle"}</span>
                 <span className="text-xs font-body tracking-wider hidden sm:block">{user ? user.username.toUpperCase() : "LOGIN"}</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

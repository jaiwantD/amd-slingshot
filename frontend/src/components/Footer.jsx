import React from 'react';

export default function Footer() {
  return (
    <footer aria-label="Footer" className="bg-black text-orange-500 font-['Inter'] text-xs w-full py-16 border-t border-white/5 tonal-shift-lowest flat z-30 relative mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 lg:px-20 max-w-[1920px] mx-auto">
        <div className="col-span-1 md:col-span-2">
          <div className="font-['Space_Grotesk'] text-xl text-white font-bold mb-4">NEON_LABS</div>
          <p className="text-neutral-500 max-w-sm mb-6">Pioneering the future of artificial intelligence through advanced hardware architectures and cognitive substrates.</p>
          <div className="text-neutral-500">©2024 NEON OBSERVATORY. ALL RIGHTS RESERVED.</div>
        </div>
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Resources</h4>
          <ul className="flex flex-col gap-3">
            <li><a className="text-neutral-500 hover:text-orange-400 opacity-80 hover:opacity-100 transition-all duration-300 focus:outline-none focus:text-orange-400" href="#">Hardware Specs</a></li>
            <li><a className="text-neutral-500 hover:text-orange-400 opacity-80 hover:opacity-100 transition-all duration-300 focus:outline-none focus:text-orange-400" href="#">Neural Ethics</a></li>
            <li><a className="text-neutral-500 hover:text-orange-400 opacity-80 hover:opacity-100 transition-all duration-300 focus:outline-none focus:text-orange-400" href="#">Documentation</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Company</h4>
          <ul className="flex flex-col gap-3">
            <li><a className="text-neutral-500 hover:text-orange-400 opacity-80 hover:opacity-100 transition-all duration-300 focus:outline-none focus:text-orange-400" href="#">Shipping</a></li>
            <li><a className="text-neutral-500 hover:text-orange-400 opacity-80 hover:opacity-100 transition-all duration-300 focus:outline-none focus:text-orange-400" href="#">Support</a></li>
            <li><a className="text-neutral-500 hover:text-orange-400 opacity-80 hover:opacity-100 transition-all duration-300 focus:outline-none focus:text-orange-400" href="#">Contact Lab</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

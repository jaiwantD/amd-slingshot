import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <article className="group flex flex-col relative w-full h-full bg-surface-container-lowest pb-6">
      <div className="aspect-[4/3] w-full bg-surface-container-low rounded-DEFAULT mb-6 relative overflow-hidden transition-all duration-500 group-hover:bg-surface-container-high focus-within:ring-2 focus-within:ring-secondary">
        {product.image_url ? (
          <img 
            alt={`Image of ${product.name}`} 
            className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" 
            src={product.image_url}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[64px] text-surface-variant">memory</span>
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-surface-variant text-on-surface px-2 py-1 text-[10px] font-mono tracking-wider rounded-sm ghost-border">SKU: {product.sku}</span>
          {product.features?.Status === "Early Access" && (
             <span className="bg-secondary/20 text-secondary border border-secondary/50 px-2 py-1 text-[10px] font-bold tracking-wider rounded-sm backdrop-blur-md uppercase">Early Access</span>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col px-2">
        <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-on-surface-variant font-body mb-6 line-clamp-2">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features && Object.entries(product.features).map(([key, val]) => (
            <span key={key} className="bg-surface-container-highest px-2 py-1 text-[11px] text-on-surface-variant rounded-sm font-mono ghost-border">
              {val}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-headline text-xl text-on-surface tracking-tight">${product.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          <button 
            aria-label={`Add ${product.name} to Cart`} 
            onClick={handleAdd}
            className="thermal-gradient text-on-primary-fixed font-bold text-sm px-6 py-2.5 rounded-sm hover:opacity-90 transition-opacity flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-surface"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

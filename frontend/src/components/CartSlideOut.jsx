import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartSlideOut() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const slideOutRef = useRef(null);
  
  const [checkoutState, setCheckoutState] = useState('IDLE'); // IDLE, PAYMENT, PROCESSING, SUCCESS
  const [transactionId, setTransactionId] = useState('');

  // A11y Focus trap & escape handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    
    if (isCartOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; 
      setTimeout(() => {
          const closeBtn = slideOutRef.current?.querySelector('button[aria-label="Close cart"]');
          if (closeBtn) closeBtn.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      if (checkoutState === 'SUCCESS') setCheckoutState('IDLE'); // Reset on close
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setIsCartOpen, checkoutState]);

  const handleCheckoutInit = () => {
      if (!user) {
          alert("Unauthorized: Please log in to complete hardware requisition.");
          return;
      }
      setCheckoutState('PAYMENT');
  };

  const submitTransaction = () => {
      if (!transactionId.trim()) {
          alert("A valid transaction ID is required.");
          return;
      }
      
      setCheckoutState('PROCESSING');
      
      // Simulate real checkout latency
      setTimeout(() => {
          clearCart();
          setCheckoutState('SUCCESS');
          setTransactionId('');
          
          // Auto close after 3 seconds securely
          setTimeout(() => {
              setIsCartOpen(false);
              setCheckoutState('IDLE');
          }, 3000);
      }, 2500);
  };

  const totalValue = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div 
      className={`fixed inset-0 z-[100] transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isCartOpen}
      aria-label="Shopping Cart"
    >
      <div 
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 backdrop-blur-sm ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      ></div>
      
      <div 
        ref={slideOutRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-surface-container shadow-2xl flex flex-col border-l border-white/10"
        aria-live="polite"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-headline text-2xl font-bold text-on-surface">Thermal Output (Cart)</h2>
          <button 
            aria-label="Close cart" 
            onClick={() => setIsCartOpen(false)}
            className="text-on-surface-variant hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm p-1 disabled:opacity-50"
            disabled={checkoutState === 'PROCESSING'}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {checkoutState === 'PROCESSING' && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-secondary animate-pulse">
                  <span className="material-symbols-outlined text-[64px] animate-spin">memory</span>
                  <p className="font-mono tracking-widest text-sm">TRANSMITTING MANIFEST...</p>
              </div>
          )}
          {checkoutState === 'SUCCESS' && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-green-500">
                  <span className="material-symbols-outlined text-[64px]">check_circle</span>
                  <p className="font-headline tracking-tight text-xl font-bold">REQUISITION APPROVED</p>
                  <p className="font-body text-sm text-on-surface-variant text-center">Hardware dispatched to your node.</p>
              </div>
          )}
          {checkoutState === 'IDLE' && (
              cartItems.length === 0 ? (
                <p className="text-on-surface-variant text-center my-auto font-body">No hardware detected in the buffer.</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-surface-container-highest p-4 rounded-sm ghost-border">
                    {item.image_url ? (
                      <img src={item.image_url} alt={`Image of ${item.name}`} className="w-16 h-16 object-cover rounded-DEFAULT bg-white/5 p-2" />
                    ) : (
                      <div className="w-16 h-16 bg-surface-variant rounded-DEFAULT flex items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined">memory</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-headline font-bold text-on-surface">{item.name}</h3>
                      <p className="text-sm font-body text-on-surface-variant">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-mono text-secondary">${(item.price * item.quantity).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      <button 
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeFromCart(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors focus:outline-none focus:ring-2 focus:ring-error rounded-sm"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )
          )}
          {checkoutState === 'PAYMENT' && (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                  <div className="w-full">
                      <label className="block text-sm font-bold text-on-surface mb-2 font-mono" htmlFor="transaction_id">
                          TRANSACTION ID INPUT
                      </label>
                      <input 
                          id="transaction_id"
                          type="text" 
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="Enter 16-digit hexadecimal code"
                          className="w-full bg-surface-container-highest border border-white/20 rounded-sm py-3 px-4 text-on-surface font-mono placeholder:text-on-surface-variant focus:ring-2 focus:ring-secondary focus:outline-none transition-all"
                      />
                      <p className="text-xs text-on-surface-variant mt-2 font-body">
                          Submit your authorized node's crypto payment hash to begin component requisition.
                      </p>
                  </div>
              </div>
          )}
        </div>

        {(checkoutState === 'IDLE' || checkoutState === 'PAYMENT') && cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-surface-container-low">
            <div className="flex justify-between items-center mb-6">
              <span className="font-body text-on-surface-variant">Total Value</span>
              <span className="font-headline text-2xl font-bold text-on-surface">
                ${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </span>
            </div>
            {!user && (
                <p className="text-xs text-error font-body mb-2 tracking-wide">* Authentication required for checkout</p>
            )}
            
            {checkoutState === 'IDLE' ? (
                <button 
                  aria-label="Proceed to Checkout"
                  onClick={handleCheckoutInit}
                  className="w-full thermal-gradient text-on-primary-fixed font-bold text-lg py-4 rounded-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary uppercase tracking-widest"
                >
                  Initialize Checkout
                </button>
            ) : (
                <button 
                  aria-label="Confirm Transaction"
                  onClick={submitTransaction}
                  className="w-full bg-secondary text-surface font-bold text-lg py-4 rounded-sm hover:bg-[#ffb073] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary uppercase tracking-widest"
                >
                  Verify Hash
                </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

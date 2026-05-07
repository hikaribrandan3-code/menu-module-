import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Wallet, Gift, Info, PlusCircle, Plus, Store, Sun, Moon, Edit, Flame, Leaf } from 'lucide-react';

export function DeliverySettings() {
  const {
    deliveryRadius, setDeliveryRadius,
    deliveryFee, setDeliveryFee,
    freeDeliveryThreshold, setFreeDeliveryThreshold,
    isDeliveryFeeEnabled, setIsDeliveryFeeEnabled,
    isFreeDeliveryEnabled, setIsFreeDeliveryEnabled
  } = useApp();

  return (
    <section className="border-t border-stone-200 pt-12 md:pt-16 mb-16 md:mb-24">
      <div className="bg-white border-2 border-stone-100 rounded-[2rem] p-6 md:p-10 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
           <Leaf className="w-40 h-40 text-amber-500 -rotate-12" />
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl text-stone-950 mb-3 font-black tracking-tight leading-none italic">
              Delivery System
            </h2>
            <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-medium">
              Set your delivery range, fees and thresholds.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Map & Radius - Focused Version */}
        <div className="col-span-12 group">
          <div className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden flex flex-col md:flex-row shadow-sm transition-all hover:shadow-md h-auto md:h-72">
            <div className="h-64 md:h-full w-full md:w-3/5 relative bg-stone-50 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-stone-100">
              <div className="absolute inset-0 opacity-[0.03]" 
                   style={{ backgroundImage: `radial-gradient(circle, #059669 2px, transparent 2px)`, backgroundSize: '40px 40px' }}></div>
              
              <motion.div 
                initial={false}
                animate={{ 
                  width: `${deliveryRadius * 6 + 15}%`, 
                  height: `${deliveryRadius * 6 + 15}%` 
                }}
                className="max-w-[80%] max-h-[80%] rounded-full border-2 border-emerald-600/20 bg-emerald-600/5 flex items-center justify-center relative transition-all ease-out duration-1000"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600 rounded-full shadow-lg ring-4 ring-emerald-600/10 flex items-center justify-center">
                   <Store className="w-5 h-5 text-white" />
                </div>
                
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-950 text-white px-4 py-1.5 rounded-full font-black text-[10px] tracking-[0.15em] shadow-xl font-display italic whitespace-nowrap">
                  {deliveryRadius} MILES
                </div>
              </motion.div>
            </div>

            <div className="p-6 md:p-8 w-full md:w-2/5 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.2em] italic">Radius Settings</h3>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] text-emerald-600">Active</span>
                </div>
              </div>
              <div className="space-y-6">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={deliveryRadius}
                  onChange={(e) => setDeliveryRadius(parseInt(e.target.value))}
                  className="w-full h-1 bg-stone-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[9px] font-bold text-stone-400 uppercase tracking-[0.15em]">
                  <span className="px-2 py-1 bg-stone-50 rounded-lg">Local</span>
                  <span className="text-emerald-600 px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-100">Regional</span>
                  <span className="px-2 py-1 bg-stone-50 rounded-lg">Wide</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fees - Grid Layout */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <div className="bg-white rounded-[2rem] border border-stone-200 p-8 flex flex-col shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-6 text-left">
              <div>
                <p className="text-stone-400 font-bold uppercase text-xs tracking-[0.3em] mb-1">SERVICE FEE</p>
                <h3 className="text-xl text-stone-950 font-display font-black italic">Base Fee</h3>
              </div>
              <label className="relative flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isDeliveryFeeEnabled}
                  onChange={(e) => setIsDeliveryFeeEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="h-6 w-11 rounded-full bg-stone-100 transition-all peer-checked:bg-emerald-600">
                    <div className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${isDeliveryFeeEnabled ? 'translate-x-5' : ''}`} />
                </div>
              </label>
            </div>
            
            <div className={`relative transition-all duration-500 ${isDeliveryFeeEnabled ? 'opacity-100' : 'opacity-20 scale-95'}`}>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 font-display font-black text-2xl italic">$</div>
              <input
                type="text"
                value={deliveryFee}
                disabled={!isDeliveryFeeEnabled}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="w-full bg-stone-50 text-stone-950 font-display font-black pl-11 py-5 rounded-2xl focus:bg-white transition-all text-4xl outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="bg-emerald-600 rounded-[2rem] p-8 flex flex-col shadow-xl shadow-emerald-900/10 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 p-4 opacity-10 drop-shadow-2xl">
               <Gift className="w-24 h-24 text-white -rotate-12" />
            </div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-1">COMPLIMENTARY</p>
                <h3 className="text-xl text-white font-display font-black italic">Free Delivery Above</h3>
              </div>
              <label className="relative flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isFreeDeliveryEnabled}
                  onChange={(e) => setIsFreeDeliveryEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="h-6 w-11 rounded-full bg-emerald-700 transition-all peer-checked:bg-white">
                    <div className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white peer-checked:bg-stone-950 shadow-sm transition-all duration-300 ${isFreeDeliveryEnabled ? 'translate-x-5' : ''}`} />
                </div>
              </label>
            </div>

            <div className={`relative z-10 transition-all duration-500 ${isFreeDeliveryEnabled ? 'opacity-100' : 'opacity-20 scale-95'}`}>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400 font-display font-black text-2xl italic">$</div>
              <input
                type="text"
                value={freeDeliveryThreshold}
                disabled={!isFreeDeliveryEnabled}
                onChange={(e) => setFreeDeliveryThreshold(e.target.value)}
                className="w-full bg-white/10 text-white font-display font-black pl-11 py-5 rounded-2xl focus:bg-white/20 transition-all text-4xl outline-none placeholder-white/20"
                placeholder="--.--"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
Translation Keys Needed:
- radius_control_title
- active_status
- miles_label
- local_label
- regional_label
- wide_label
- service_fee_label
- base_fee_title
- complimentary_label
- free_delivery_above_title
*/

import React from 'react';
import { motion } from 'motion/react';
import { useLocalState } from '../context/LocalStateContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Gift, Store, Leaf, Power } from 'lucide-react';

export function DeliverySettings() {
  const {
    deliveryRadius, setDeliveryRadius,
    deliveryFee, setDeliveryFee,
    freeDeliveryThreshold, setFreeDeliveryThreshold,
    isDeliveryFeeEnabled, setIsDeliveryFeeEnabled,
    isFreeDeliveryEnabled, setIsFreeDeliveryEnabled,
    isDeliveryPaused, setIsDeliveryPaused
  } = useLocalState();
  const { t } = useLanguage();

  return (
    <section className="border-t border-stone-200 pt-12 md:pt-16 mb-16 md:mb-24">
      <div className={`bg-white border-2 rounded-[2rem] p-6 md:p-10 mb-8 shadow-sm relative overflow-hidden transition-all duration-500 ${isDeliveryPaused ? 'border-amber-200' : 'border-stone-100'}`}>
        <div className="absolute top-0 right-0 p-6 opacity-5">
           <Leaf className="w-40 h-40 text-emerald-500 -rotate-12" />
        </div>
        
        <div className="flex flex-col items-center text-center gap-6 relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl text-stone-950 mb-3 font-black tracking-tight leading-none italic">
              {t('delivery_system_title')}
            </h2>
            <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-medium">
              {t('delivery_system_subtitle')}
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <button 
              onClick={() => setIsDeliveryPaused(!isDeliveryPaused)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all active:scale-95 text-[10px] font-black uppercase tracking-[0.2em] ${
                isDeliveryPaused 
                  ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-lg shadow-amber-900/10' 
                  : 'bg-stone-50 text-stone-400 border-stone-100 hover:border-stone-200'
              }`}
            >
              <Power className={`w-4 h-4 transition-transform ${isDeliveryPaused ? 'rotate-90' : ''}`} />
              {t('pause_delivery_label')}
            </button>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 transition-all duration-700 ${isDeliveryPaused ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
        {/* Map & Radius - Now Compact Slot */}
        <div className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden flex flex-col shadow-sm transition-all hover:shadow-md">
          <div className="h-40 relative bg-stone-50 flex items-center justify-center overflow-hidden border-b border-stone-100">
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: `radial-gradient(circle, #059669 2px, transparent 2px)`, backgroundSize: '30px 30px' }}></div>
            
            <motion.div 
              initial={false}
              animate={{ 
                width: `${deliveryRadius * 6 + 20}%`, 
                height: `${deliveryRadius * 6 + 20}%` 
              }}
              className="max-w-[85%] max-h-[85%] rounded-full border-2 border-emerald-600/20 bg-emerald-600/5 flex items-center justify-center relative transition-all ease-out duration-1000"
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-full shadow-lg ring-4 ring-emerald-600/10 flex items-center justify-center">
                 <Store className="w-4 h-4 text-white" />
              </div>
              
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-950 text-white px-3 py-1 rounded-full font-black text-[9px] tracking-[0.15em] shadow-xl font-display italic whitespace-nowrap">
                {deliveryRadius} {t('kms_label')}
              </div>
            </motion.div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.2em] italic">{t('radius_settings_title')}</h3>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-[0.1em] text-emerald-600">{t('active_status')}</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={deliveryRadius}
              onChange={(e) => setDeliveryRadius(parseInt(e.target.value))}
              className="w-full h-1 bg-stone-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        {/* Fees - Service Fee */}
        <div className="bg-white rounded-[2rem] border border-stone-200 p-8 flex flex-col shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-6 text-left">
            <div>
              <p className="text-stone-400 font-bold uppercase text-xs tracking-[0.3em] mb-1">{t('service_fee_label')}</p>
              <h3 className="text-xl text-stone-950 font-display font-black italic">{t('base_fee_title')}</h3>
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

        {/* Complimentary */}
        <div className="bg-emerald-600 rounded-[2rem] p-8 flex flex-col shadow-xl shadow-emerald-900/10 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 p-4 opacity-10 drop-shadow-2xl">
             <Gift className="w-24 h-24 text-white -rotate-12" />
          </div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-1">{t('complimentary_label')}</p>
              <h3 className="text-xl text-white font-display font-black italic">{t('free_delivery_above_title')}</h3>
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
    </section>
  );
}

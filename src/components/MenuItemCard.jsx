/*
Translation Keys Needed:
- kcal_label
- special_label
- natural_label
- spicy_label
- no_tacc_label
- available_label
- sold_out_label
*/

import { motion } from 'motion/react';
import { 
  Flame, 
  Leaf, 
  Star, 
  Wheat
} from 'lucide-react';
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function MenuItemCard({ item }) {
  const { t } = useLanguage();
  const [inStock, setInStock] = useState(item.inStock);
  const [description, setDescription] = useState(item.description);
  const [kcal, setKcal] = useState(item.kcal);
  const [isVegan, setIsVegan] = useState(item.isVegan || false);
  const [isGlutenFree, setIsGlutenFree] = useState(item.isGlutenFree || false);
  const [isSpicy, setIsSpicy] = useState(item.isSpicy || false);
  const [isFeatured, setIsFeatured] = useState(item.isFeatured || false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group/card relative flex flex-col overflow-hidden rounded-[2rem] bg-white border border-stone-200 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(28,25,23,0.06)] hover:-translate-y-1.5 ${
        !inStock ? 'opacity-60 saturate-[0.2]' : ''
      }`}
    >
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
        />
        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover/card:opacity-100"></div>
        
        <div className="absolute top-6 right-6 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-4 py-2 text-stone-900 shadow-xl border border-white/50 pointer-events-auto">
            <Flame className="h-3.5 w-3.5 text-emerald-600 fill-current" />
            <input 
              type="text"
              value={kcal}
              onChange={(e) => setKcal(Number(e.target.value))}
              className="w-10 bg-transparent text-[10px] font-bold uppercase tracking-[0.1em] border-none outline-none focus:text-emerald-600"
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.1em]">{t('kcal_label')}</span>
          </div>
        </div>

        <div className="absolute top-6 left-6 flex flex-col gap-2 items-start pointer-events-none">
          {isFeatured && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-white shadow-xl border border-amber-400/50"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t('special_label')}</span>
            </motion.div>
          )}
          {isVegan && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-white shadow-xl"
            >
              <Leaf className="h-3.5 w-3.5 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t('natural_label')}</span>
            </motion.div>
          )}
          {isSpicy && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-white shadow-xl"
            >
              <Flame className="h-3.5 w-3.5 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t('spicy_label')}</span>
            </motion.div>
          )}
          {isGlutenFree && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 rounded-full bg-stone-900/90 backdrop-blur-md px-4 py-2 text-white shadow-xl border border-white/10"
            >
              <Wheat className="h-3.5 w-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t('no_tacc_label')}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-6 md:p-8">
        <div className="flex justify-between items-start gap-4">
          <h4 className="flex-grow font-display text-xl md:text-2xl font-black text-stone-950 leading-tight italic">
            {item.name}
          </h4>
          <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
            <span className="text-xl md:text-2xl font-black text-emerald-600 font-display">
              ${item.price}
            </span>
            <div className="flex items-center gap-1.5 opacity-40">
               {isVegan && <Leaf className="h-3 w-3 text-emerald-600 fill-current" />}
               {isGlutenFree && <Wheat className="h-3 w-3 text-stone-950" />}
               {isSpicy && <Flame className="h-3 w-3 text-rose-600 fill-current" />}
            </div>
          </div>
        </div>

        <p className="text-[12px] font-medium leading-relaxed text-stone-500 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-50">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setInStock(!inStock)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 text-[9px] font-black uppercase tracking-[0.15em] shadow-sm ${
                inStock 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                  : 'bg-stone-100 text-stone-400 border-stone-200'
              }`}
            >
              <div className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`} />
              {inStock ? t('available_label') : t('sold_out_label')}
            </button>
            <div className="flex gap-1">
              <button 
                onClick={() => setIsVegan(!isVegan)}
                className={`p-1.5 rounded-lg border transition-all ${isVegan ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-white border-stone-200 text-stone-300'}`}
              >
                <Leaf className="h-3 w-3" />
              </button>
              <button 
                onClick={() => setIsGlutenFree(!isGlutenFree)}
                className={`p-1.5 rounded-lg border transition-all ${isGlutenFree ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-200 text-stone-300'}`}
              >
                <Wheat className="h-3 w-3" />
              </button>
              <button 
                onClick={() => setIsSpicy(!isSpicy)}
                className={`p-1.5 rounded-lg border transition-all ${isSpicy ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-stone-200 text-stone-300'}`}
              >
                <Flame className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setIsFeatured(!isFeatured)}
            className={`p-2 rounded-xl border transition-all ${isFeatured ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white border-stone-200 text-stone-300'}`}
            title="Toggle Featured"
          >
            <Star className={`h-4 w-4 ${isFeatured ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

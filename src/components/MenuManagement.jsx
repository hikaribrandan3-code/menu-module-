/*
Translation Keys Needed:
- cuisine_library_label
- menu_offerings_title
- curate_vision_subtitle
- new_recipe_button
- add_food_photo_label
- create_recipe_title
- dish_name_label
- price_label
- calories_label
- description_label
- add_to_menu_button
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Camera, Flame } from 'lucide-react';
import { MenuItemCard } from './MenuItemCard';
import { useTenant } from '../contexts/TenantContext';
import { useLocalState } from '../context/LocalStateContext';
import { useLanguage } from '../contexts/LanguageContext';
import { CategorySidebar } from './CategorySidebar';

export function MenuManagement() {
  const { businessId } = useTenant();
  const { t } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    price: '',
    kcal: '',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
  });

  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Supreme Burger',
      price: 14.99,
      description: 'Double beef patty, melted cheddar, crispy bacon, lettuce, tomato, and our signature house sauce on a toasted brioche bun.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
      kcal: 850,
      inStock: true
    },
    {
      id: '2',
      name: 'Classic Cheeseburger',
      price: 9.99,
      description: 'Single beef patty with American cheese, pickles, onions, ketchup, and mustard.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
      kcal: 540,
      inStock: false
    },
    {
      id: '3',
      name: 'Veggie Burger',
      price: 11.49,
      description: 'House-made black bean patty, avocado, red onion, arugula, and vegan mayo on a whole wheat bun.',
      image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=800&auto=format&fit=crop',
      kcal: 420,
      inStock: true,
      isVegan: true
    }
  ]);

  React.useEffect(() => {
    if (isAdding) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAdding]);

  const handleAddRecipe = () => {
    if (!newRecipe.name || !newRecipe.price) return;
    
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newRecipe.name,
      description: newRecipe.description || 'A new discovery.',
      price: Number(newRecipe.price),
      kcal: Number(newRecipe.kcal) || 0,
      image: newRecipe.image,
      inStock: true
    };
    
    setMenuItems([newItem, ...menuItems]);
    setIsAdding(false);
    setNewRecipe({
      name: '',
      description: '',
      price: '',
      kcal: '',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
    });
  };

  return (
    <section className="mb-16 md:mb-32">
      <div className="bg-white border-2 border-stone-200 rounded-[2.5rem] p-6 md:p-16 mb-12 shadow-[0_20px_50px_rgba(28,25,23,0.03)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Plus className="w-64 h-64 text-emerald-600 rotate-12" />
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 md:gap-12 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-6 w-1 bg-emerald-600 rounded-full" />
              <p className="text-emerald-600 font-black tracking-[0.3em] uppercase text-[10px] md:text-[12px]">{t('cuisine_library_label')}</p>
            </div>
            <h2 className="font-display text-4xl md:text-7xl text-stone-950 mb-6 font-black tracking-tight leading-none italic">
              {t('menu_offerings_title')}
            </h2>
            <p className="text-base md:text-xl text-stone-600 leading-relaxed font-medium">
              {t('curate_vision_subtitle')}
            </p>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-grow lg:flex-none flex items-center justify-center gap-3 px-12 h-16 bg-emerald-600 text-white font-black text-sm md:text-base uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-500 transition-all shadow-2xl active:scale-95"
            >
              {t('new_recipe_button')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 md:gap-20">
        <CategorySidebar />
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* New Recipe Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-stone-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative z-10 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row"
            >
              {/* Photo Upload Side */}
              <div className="w-full md:w-2/5 bg-stone-100 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-stone-200 group/upload cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-4 text-stone-300 group-hover/upload:text-emerald-500 transition-colors z-10">
                  <Camera className="h-10 w-10" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 z-10">{t('add_food_photo_label')}</p>
                <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover/upload:opacity-100 transition-opacity"></div>
              </div>

              {/* Form Side */}
              <div className="flex-grow p-8 md:p-12 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-display font-black tracking-tight italic">{t('create_recipe_title')}</h3>
                  <button onClick={() => setIsAdding(false)} className="text-stone-300 hover:text-stone-950 transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest">{t('dish_name_label')}</label>
                    <input 
                      type="text" 
                      placeholder="The Midnight Saffron..."
                      className="w-full bg-stone-50 border-none rounded-xl p-4 font-bold text-stone-950 outline-none focus:bg-stone-100 transition-all"
                      value={newRecipe.name}
                      onChange={e => setNewRecipe({...newRecipe, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest">{t('price_label')}</label>
                      <input 
                        type="text" 
                        placeholder="28.00"
                        className="w-full bg-stone-50 border-none rounded-xl p-4 font-bold text-stone-950 outline-none"
                        value={newRecipe.price}
                        onChange={e => setNewRecipe({...newRecipe, price: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest">{t('calories_label')}</label>
                      <div className="relative">
                        <Flame className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-300" />
                        <input 
                          type="text" 
                          placeholder="450"
                          className="w-full bg-stone-50 border-none rounded-xl pl-10 p-4 font-bold text-stone-950 outline-none"
                          value={newRecipe.kcal}
                          onChange={e => setNewRecipe({...newRecipe, kcal: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest">{t('description_label')}</label>
                    <textarea 
                      placeholder="Briefly describe the flavor profile..."
                      className="w-full h-24 bg-stone-50 border-none rounded-xl p-4 font-medium text-stone-500 italic resize-none outline-none focus:bg-stone-100"
                      value={newRecipe.description}
                      onChange={e => setNewRecipe({...newRecipe, description: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleAddRecipe}
                  className="w-full bg-stone-950 text-white font-display font-black uppercase tracking-[0.15em] italic py-4 rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center"
                >
                  {t('add_to_menu_button')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { createContext, useContext } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Simple mock translation function
  const t = (key) => {
    const translations = {
      'kcal_label': 'KCAL',
      'special_label': 'Special',
      'natural_label': 'Natural',
      'spicy_label': 'Spicy',
      'no_tacc_label': 'No TACC',
      'available_label': 'Available',
      'sold_out_label': 'Sold Out',
      'menu_tab': 'Menu',
      'inventory_tab': 'Inventory',
      'cuisine_library_label': 'Digital Cuisine Library',
      'menu_offerings_title': 'Menu Offerings',
      'curate_vision_subtitle': 'Curate your culinary vision.',
      'new_recipe_button': 'New Recipe',
      'delivery_system_title': 'Delivery System',
      'delivery_system_subtitle': 'Set your delivery range, fees and thresholds.',
      'pause_delivery_label': 'Pause Delivery',
      'radius_settings_title': 'Radius Settings',
      'active_status': 'Active',
      'kms_label': 'KMS',
      'service_fee_label': 'SERVICE FEE',
      'base_fee_title': 'Base Fee',
      'complimentary_label': 'COMPLIMENTARY',
      'free_delivery_above_title': 'Free Delivery Above',
      'add_to_menu_button': 'Add to Menu',
      'create_recipe_title': 'Create Recipe',
      'dish_name_label': 'Dish Name',
      'price_label': 'Price ($)',
      'calories_label': 'Calories (KCAL)',
      'description_label': 'Description',
      'add_food_photo_label': 'Add Food Photo',
      'category_label': 'Category'
    };
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) return { t: (k) => k };
  return context;
}

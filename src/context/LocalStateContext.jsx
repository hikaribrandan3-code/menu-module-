import React, { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();

export function LocalStateProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState('Burgers');
  const [activeTab, setActiveTab] = useState('menu');
  const [deliveryRadius, setDeliveryRadius] = useState(5);
  const [deliveryFee, setDeliveryFee] = useState('2.99');
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState('35.00');
  const [isDeliveryFeeEnabled, setIsDeliveryFeeEnabled] = useState(true);
  const [isFreeDeliveryEnabled, setIsFreeDeliveryEnabled] = useState(true);
  const [isDeliveryPaused, setIsDeliveryPaused] = useState(false);

  return (
    <LocalStateContext.Provider value={{
      activeCategory, setActiveCategory,
      activeTab, setActiveTab,
      deliveryRadius, setDeliveryRadius,
      deliveryFee, setDeliveryFee,
      freeDeliveryThreshold, setFreeDeliveryThreshold,
      isDeliveryFeeEnabled, setIsDeliveryFeeEnabled,
      isFreeDeliveryEnabled, setIsFreeDeliveryEnabled,
      isDeliveryPaused, setIsDeliveryPaused
    }}>
      {children}
    </LocalStateContext.Provider>
  );
}

export function useLocalState() {
  const context = useContext(LocalStateContext);
  if (!context) throw new Error('useLocalState must be used within a LocalStateProvider');
  return context;
}

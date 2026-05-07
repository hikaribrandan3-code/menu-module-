import { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeTab: 'menu' | 'inventory';
  setActiveTab: (tab: 'menu' | 'inventory') => void;
  deliveryRadius: number;
  setDeliveryRadius: (radius: number) => void;
  deliveryFee: string;
  setDeliveryFee: (fee: string) => void;
  freeDeliveryThreshold: string;
  setFreeDeliveryThreshold: (threshold: string) => void;
  isDeliveryFeeEnabled: boolean;
  setIsDeliveryFeeEnabled: (enabled: boolean) => void;
  isFreeDeliveryEnabled: boolean;
  setIsFreeDeliveryEnabled: (enabled: boolean) => void;
  businessId?: string;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState('Burgers');
  const [activeTab, setActiveTab] = useState<'menu' | 'inventory'>('menu');
  const [deliveryRadius, setDeliveryRadius] = useState(5);
  const [deliveryFee, setDeliveryFee] = useState('2.99');
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState('35.00');
  const [isDeliveryFeeEnabled, setIsDeliveryFeeEnabled] = useState(true);
  const [isFreeDeliveryEnabled, setIsFreeDeliveryEnabled] = useState(true);
  const [businessId] = useState('foodspot-1');

  return (
    <AppContext.Provider value={{
      activeCategory, setActiveCategory,
      activeTab, setActiveTab,
      deliveryRadius, setDeliveryRadius,
      deliveryFee, setDeliveryFee,
      freeDeliveryThreshold, setFreeDeliveryThreshold,
      isDeliveryFeeEnabled, setIsDeliveryFeeEnabled,
      isFreeDeliveryEnabled, setIsFreeDeliveryEnabled,
      businessId
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}

import React, { createContext, useContext, useState } from 'react';

const TenantContext = createContext();

export function TenantProvider({ children }) {
  const [businessId] = useState('demo-business-id');
  return (
    <TenantContext.Provider value={{ businessId }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) return { businessId: 'demo' };
  return context;
}

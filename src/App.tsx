/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MenuManagement } from './components/MenuManagement';
import { InventoryManagement } from './components/InventoryManagement';
import { DeliverySettings } from './components/DeliverySettings';
import { PortalHeader } from './components/Navigation';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { activeTab } = useApp();

  useEffect(() => {
    document.body.classList.add('restaurant-portal');
    return () => {
      document.body.classList.remove('restaurant-portal');
    };
  }, []);

  return (
    <div className="bg-stone-50 text-stone-950 font-sans min-h-screen flex flex-col transition-colors duration-500">
      <PortalHeader />
      <main className="flex-grow px-4 md:px-12 py-10 md:py-16 max-w-7xl mx-auto w-full">
        {activeTab === 'menu' ? (
          <div className="space-y-24 md:space-y-40">
            <MenuManagement />
            <DeliverySettings />
          </div>
        ) : (
          <div className="space-y-20">
            <InventoryManagement />
            <DeliverySettings />
          </div>
        )}
      </main>
      
      <footer className="py-12 border-t border-stone-200 text-center">
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { RegionsPage } from './pages/RegionsPage';
import { SiegePage } from './pages/SiegePage';
import { VTAPage } from './pages/VTAPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { regions } from './data/regions';
import { loadFromStorage, saveToStorage } from './utils/storage';
import type { RegionData } from './types';

export function App() {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [regionData, setRegionData] = useState<RegionData[]>(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(regionData);
  }, [regionData]);

  const handleDataSubmit = (data: Omit<RegionData, 'id' | 'date'>) => {
    const newData: RegionData = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0]
    };
    setRegionData(prev => [...prev, newData]);
  };

  const handleDelete = (id: string) => {
    setRegionData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 py-8">
        <Navigation />
        <Routes>
          <Route 
            path="/" 
            element={
              <RegionsPage
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                regionData={regionData}
                onDataSubmit={handleDataSubmit}
                onDelete={handleDelete}
              />
            } 
          />
          <Route 
            path="/siege" 
            element={<SiegePage data={regionData} />} 
          />
          <Route 
            path="/vta" 
            element={<VTAPage />} 
          />
          <Route 
            path="/analytics" 
            element={<AnalyticsPage data={regionData} />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
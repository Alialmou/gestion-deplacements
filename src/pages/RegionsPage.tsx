import React from 'react';
import { RegionForm } from '../components/RegionForm';
import { RegionTable } from '../components/RegionTable';
import { regions } from '../data/regions';
import { loadSiegeData } from '../utils/storage';
import type { RegionData } from '../types';

interface RegionsPageProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  regionData: RegionData[];
  onDataSubmit: (data: Omit<RegionData, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function RegionsPage({ 
  selectedRegion, 
  setSelectedRegion, 
  regionData, 
  onDataSubmit,
  onDelete
}: RegionsPageProps) {
  const siegeData = loadSiegeData();
  const totalRegionalDotations = regionData.reduce(
    (acc, curr) => ({
      vtt: acc.vtt + curr.dotationVTT,
      oncfPro: acc.oncfPro + curr.dotationONCFPro
    }),
    { vtt: 0, oncfPro: 0 }
  );

  const remainingDotations = {
    vtt: siegeData.dotationVTT - totalRegionalDotations.vtt,
    oncfPro: siegeData.dotationONCFPro - totalRegionalDotations.oncfPro
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionnez une région
        </label>
        <select
          id="region"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <RegionForm 
          region={selectedRegion} 
          onSubmit={onDataSubmit} 
          remainingDotations={remainingDotations}
        />
        <div className="flex-1">
          <RegionTable 
            data={regionData} 
            region={selectedRegion} 
            onDelete={onDelete} 
          />
        </div>
      </div>
    </div>
  );
}
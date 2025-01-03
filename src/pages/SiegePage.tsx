import React, { useState, useEffect } from 'react';
import { DataSummary } from '../components/DataSummary';
import { SiegeForm } from '../components/SiegeForm';
import { loadSiegeData, saveSiegeData } from '../utils/storage';
import type { RegionData } from '../types';
import type { SiegeData } from '../types/siege';

interface SiegePageProps {
  data: RegionData[];
}

export function SiegePage({ data }: SiegePageProps) {
  const [siegeData, setSiegeData] = useState<SiegeData>(() => loadSiegeData());

  useEffect(() => {
    saveSiegeData(siegeData);
  }, [siegeData]);

  const handleUpdateSiege = (newData: SiegeData) => {
    setSiegeData(newData);
  };

  // Calculate totals from regional data
  const regionalTotals = data.reduce((acc, item) => ({
    dotationVTT: acc.dotationVTT + item.dotationVTT,
    dotationONCFPro: acc.dotationONCFPro + item.dotationONCFPro,
    consommationVTT: acc.consommationVTT + item.consommationVTT,
    consommationONCFPro: acc.consommationONCFPro + item.consommationONCFPro,
  }), {
    dotationVTT: 0,
    dotationONCFPro: 0,
    consommationVTT: 0,
    consommationONCFPro: 0,
  });

  // Calculate remaining allocations
  const remainingAllocations = {
    dotationVTT: siegeData.dotationVTT,
    dotationONCFPro: siegeData.dotationONCFPro,
    consommationVTT: regionalTotals.consommationVTT,
    consommationONCFPro: regionalTotals.consommationONCFPro,
    disponibleVTT: siegeData.dotationVTT - regionalTotals.consommationVTT,
    disponibleONCFPro: siegeData.dotationONCFPro - regionalTotals.consommationONCFPro,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Situation du Siège</h2>
      <SiegeForm 
        data={siegeData}
        onUpdate={handleUpdateSiege}
      />
      <DataSummary data={[remainingAllocations]} />
    </div>
  );
}
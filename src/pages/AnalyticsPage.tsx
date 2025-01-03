import React from 'react';
import { ConsumptionChart } from '../components/analytics/ConsumptionChart';
import type { RegionData } from '../types';

interface AnalyticsPageProps {
  data: RegionData[];
}

export function AnalyticsPage({ data }: AnalyticsPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>
      <ConsumptionChart data={data} />
    </div>
  );
}
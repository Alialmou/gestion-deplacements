import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { RegionData } from '../../types';

interface ConsumptionChartProps {
  data: RegionData[];
}

export function ConsumptionChart({ data }: ConsumptionChartProps) {
  const vttData = data.map(item => ({
    region: item.region,
    'Consommation VTT': item.consommationVTT,
  }));

  const oncfProData = data.map(item => ({
    region: item.region,
    'Consommation ONCF Pro': item.consommationONCFPro,
  }));

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* VTT Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Consommations VTT par région</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vttData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Consommation VTT" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ONCF Pro Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Consommations ONCF Pro par région</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={oncfProData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Consommation ONCF Pro" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
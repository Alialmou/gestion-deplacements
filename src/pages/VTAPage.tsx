import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VTAData {
  dotation: number;
  consommation: number;
  solde: number;
}

export function VTAPage() {
  const [data, setData] = React.useState<VTAData>({
    dotation: 150000,
    consommation: 75000,
    solde: 75000
  });

  const chartData = [
    {
      name: 'VTA',
      Dotation: data.dotation,
      Consommation: data.consommation,
      Solde: data.solde
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;
    
    setData(prev => {
      const newData = { ...prev, [name]: numValue };
      newData.solde = newData.dotation - newData.consommation;
      return newData;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Gestion VTA</h2>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dotation
              </label>
              <input
                type="number"
                name="dotation"
                value={data.dotation}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consommation
              </label>
              <input
                type="number"
                name="consommation"
                value={data.consommation}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Solde
              </label>
              <input
                type="number"
                value={data.solde}
                disabled
                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Graphique VTA</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Dotation" fill="#3B82F6" />
                <Bar dataKey="Consommation" fill="#10B981" />
                <Bar dataKey="Solde" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import type { SiegeData } from '../types/siege';

interface SiegeFormProps {
  data: SiegeData;
  onUpdate: (data: SiegeData) => void;
}

export function SiegeForm({ data, onUpdate }: SiegeFormProps) {
  const [formData, setFormData] = useState({
    mtConvention: data.mtConvention,
    mtEchange: data.mtEchange,
    achatCarnets: data.achatCarnets,
    dotationONCFPro: data.dotationONCFPro,
  });

  useEffect(() => {
    const calculatedDotationVTT = formData.mtConvention + formData.mtEchange - formData.achatCarnets;
    const calculatedStock = calculatedDotationVTT - formData.dotationONCFPro;
    
    onUpdate({
      ...formData,
      dotationVTT: calculatedDotationVTT,
      stock: calculatedStock
    });
  }, [formData, onUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const calculatedDotationVTT = formData.mtConvention + formData.mtEchange - formData.achatCarnets;
  const calculatedStock = calculatedDotationVTT - formData.dotationONCFPro;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-6">Modifier les données du siège</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Montant Convention
            </label>
            <input
              type="number"
              name="mtConvention"
              value={formData.mtConvention}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Montant Echange
            </label>
            <input
              type="number"
              name="mtEchange"
              value={formData.mtEchange}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Achat Carnets
            </label>
            <input
              type="number"
              name="achatCarnets"
              value={formData.achatCarnets}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4 bg-green-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dotation VTT (calculée)
            </label>
            <input
              type="number"
              value={calculatedDotationVTT}
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dotation ONCF Pro
            </label>
            <input
              type="number"
              name="dotationONCFPro"
              value={formData.dotationONCFPro}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock (calculé)
            </label>
            <input
              type="number"
              value={calculatedStock}
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
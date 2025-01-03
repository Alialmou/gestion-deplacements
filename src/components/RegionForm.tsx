import React, { useState } from 'react';
import type { RegionData } from '../types';

interface RegionFormProps {
  region: string;
  onSubmit: (data: Omit<RegionData, 'id' | 'date'>) => void;
  remainingDotations: {
    vtt: number;
    oncfPro: number;
  };
}

export function RegionForm({ region, onSubmit, remainingDotations }: RegionFormProps) {
  const [formData, setFormData] = useState({
    dotationVTT: 0,
    dotationONCFPro: 0,
    consommationVTT: 0,
    consommationONCFPro: 0,
    disponibleVTT: 0,
    disponibleONCFPro: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.dotationVTT > remainingDotations.vtt) {
      alert(`La dotation VTT ne peut pas dépasser ${remainingDotations.vtt}`);
      return;
    }
    if (formData.dotationONCFPro > remainingDotations.oncfPro) {
      alert(`La dotation ONCF Pro ne peut pas dépasser ${remainingDotations.oncfPro}`);
      return;
    }

    onSubmit({ ...formData, region });
    setFormData({
      dotationVTT: 0,
      dotationONCFPro: 0,
      consommationVTT: 0,
      consommationONCFPro: 0,
      disponibleVTT: 0,
      disponibleONCFPro: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="gradient-card rounded-xl shadow-lg overflow-hidden w-[400px]">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4">
        <h3 className="text-lg font-semibold text-white">
          Ajouter des données pour {region}
          <div className="text-sm font-normal text-indigo-100 mt-1">
            Dotations restantes: VTT: {remainingDotations.vtt}, ONCF Pro: {remainingDotations.oncfPro}
          </div>
        </h3>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Dotations</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dotation VTT
              </label>
              <input
                type="number"
                name="dotationVTT"
                value={formData.dotationVTT}
                onChange={handleChange}
                max={remainingDotations.vtt}
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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
                max={remainingDotations.oncfPro}
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Consommations</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consommation VTT
              </label>
              <input
                type="number"
                name="consommationVTT"
                value={formData.consommationVTT}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consommation ONCF Pro
              </label>
              <input
                type="number"
                name="consommationONCFPro"
                value={formData.consommationONCFPro}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-3 rounded-lg">
          <h4 className="font-medium text-purple-800 mb-2">Disponibles</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disponible VTT
              </label>
              <input
                type="number"
                name="disponibleVTT"
                value={formData.disponibleVTT}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disponible ONCF Pro
              </label>
              <input
                type="number"
                name="disponibleONCFPro"
                value={formData.disponibleONCFPro}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}
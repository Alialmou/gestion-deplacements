import React from 'react';
import { Trash2 } from 'lucide-react';
import type { RegionData } from '../types';

interface RegionTableProps {
  data: RegionData[];
  region: string;
  onDelete: (id: string) => void;
}

export function RegionTable({ data, region, onDelete }: RegionTableProps) {
  const filteredData = data.filter(item => item.region === region);

  return (
    <div className="gradient-card rounded-xl shadow-lg overflow-hidden h-[600px]">
      <div className="overflow-x-auto max-h-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0">
            <tr>
              <th colSpan={2} className="px-6 py-3 bg-blue-50 text-center text-sm font-medium text-blue-800">Dotations</th>
              <th colSpan={2} className="px-6 py-3 bg-green-50 text-center text-sm font-medium text-green-800">Consommations</th>
              <th colSpan={2} className="px-6 py-3 bg-purple-50 text-center text-sm font-medium text-purple-800">Disponibles</th>
              <th className="px-6 py-3 bg-gray-50 text-center text-sm font-medium text-gray-500">Actions</th>
            </tr>
            <tr>
              <th className="px-6 py-3 bg-blue-50 text-left text-xs font-medium text-gray-500 uppercase">VTT</th>
              <th className="px-6 py-3 bg-blue-50 text-left text-xs font-medium text-gray-500 uppercase">ONCF Pro</th>
              <th className="px-6 py-3 bg-green-50 text-left text-xs font-medium text-gray-500 uppercase">VTT</th>
              <th className="px-6 py-3 bg-green-50 text-left text-xs font-medium text-gray-500 uppercase">ONCF Pro</th>
              <th className="px-6 py-3 bg-purple-50 text-left text-xs font-medium text-gray-500 uppercase">VTT</th>
              <th className="px-6 py-3 bg-purple-50 text-left text-xs font-medium text-gray-500 uppercase">ONCF Pro</th>
              <th className="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap bg-blue-50 text-sm text-gray-900">{item.dotationVTT}</td>
                <td className="px-6 py-4 whitespace-nowrap bg-blue-50 text-sm text-gray-900">{item.dotationONCFPro}</td>
                <td className="px-6 py-4 whitespace-nowrap bg-green-50 text-sm text-gray-900">{item.consommationVTT}</td>
                <td className="px-6 py-4 whitespace-nowrap bg-green-50 text-sm text-gray-900">{item.consommationONCFPro}</td>
                <td className="px-6 py-4 whitespace-nowrap bg-purple-50 text-sm text-gray-900">{item.disponibleVTT}</td>
                <td className="px-6 py-4 whitespace-nowrap bg-purple-50 text-sm text-gray-900">{item.disponibleONCFPro}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-900 transition-colors p-2 hover:bg-red-50 rounded-full"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
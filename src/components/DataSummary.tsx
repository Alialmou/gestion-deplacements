import React from 'react';
import type { RegionData } from '../types';

interface DataSummaryProps {
  data: RegionData[];
}

export function DataSummary({ data }: DataSummaryProps) {
  const totals = data.reduce((acc, curr) => ({
    dotationVTT: acc.dotationVTT + curr.dotationVTT,
    dotationONCFPro: acc.dotationONCFPro + curr.dotationONCFPro,
    consommationVTT: acc.consommationVTT + curr.consommationVTT,
    consommationONCFPro: acc.consommationONCFPro + curr.consommationONCFPro,
    disponibleVTT: acc.disponibleVTT + curr.disponibleVTT,
    disponibleONCFPro: acc.disponibleONCFPro + curr.disponibleONCFPro,
  }), {
    dotationVTT: 0,
    dotationONCFPro: 0,
    consommationVTT: 0,
    consommationONCFPro: 0,
    disponibleVTT: 0,
    disponibleONCFPro: 0,
  });

  const sections = [
    {
      title: "Dotations",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-50",
      items: [
        { label: "VTT", value: totals.dotationVTT },
        { label: "ONCF Pro", value: totals.dotationONCFPro }
      ]
    },
    {
      title: "Consommations",
      color: "from-green-500 to-green-600",
      textColor: "text-green-50",
      items: [
        { label: "VTT", value: totals.consommationVTT },
        { label: "ONCF Pro", value: totals.consommationONCFPro }
      ]
    },
    {
      title: "Disponibles",
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-50",
      items: [
        { label: "VTT", value: totals.disponibleVTT },
        { label: "ONCF Pro", value: totals.disponibleONCFPro }
      ]
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {sections.map((section) => (
        <div 
          key={section.title} 
          className="gradient-card rounded-xl shadow-lg overflow-hidden"
        >
          <div className={`bg-gradient-to-r ${section.color} p-4`}>
            <h3 className={`text-lg font-semibold ${section.textColor}`}>{section.title}</h3>
          </div>
          <div className="p-4 space-y-4">
            {section.items.map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="text-gray-900 font-semibold">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
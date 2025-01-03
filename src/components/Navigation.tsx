import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, Building, CreditCard } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  
  const links = [
    { to: "/", label: "Régions", icon: Home },
    { to: "/siege", label: "Siège", icon: Building },
    { to: "/vta", label: "VTA", icon: CreditCard },
    { to: "/analytics", label: "Analytics", icon: PieChart }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg mb-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8 py-4">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === to 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
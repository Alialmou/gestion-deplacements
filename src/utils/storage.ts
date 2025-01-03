export const STORAGE_KEY = 'region_data';
export const SIEGE_STORAGE_KEY = 'siege_data';

export const loadFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveToStorage = (data: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadSiegeData = () => {
  const stored = localStorage.getItem(SIEGE_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {
    dotationVTT: 100000,
    dotationONCFPro: 100000,
    mtConvention: 0,
    mtEchange: 0,
    achatCarnets: 0,
    stock: 0
  };
};

export const saveSiegeData = (data: any) => {
  localStorage.setItem(SIEGE_STORAGE_KEY, JSON.stringify(data));
};
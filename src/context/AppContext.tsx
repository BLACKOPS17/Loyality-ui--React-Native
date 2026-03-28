import React, { createContext, useContext, useState } from 'react';
import { MOCK_USER } from '../data/mockData';

type AppContextType = {
  user: typeof MOCK_USER;
  uploadPhoto: (url: string) => void;
  resetDay: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(MOCK_USER);

  const uploadPhoto = (url: string) => {
    setUser(prev => ({
      ...prev,
      hasUploadedToday: true,
      todayPhotoUrl: url,
      streak: prev.streak + 1,
    }));
  };

  const resetDay = () => {
    setUser(prev => ({
      ...prev,
      hasUploadedToday: false,
    }));
  };

  return (
    <AppContext.Provider value={{ user, uploadPhoto, resetDay }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

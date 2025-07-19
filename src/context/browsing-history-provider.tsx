'use client';

import { createContext, useState, useEffect } from 'react';

interface BrowsingHistoryContextType {
  history: string[];
  addHistory: (productId: string) => void;
}

export const BrowsingHistoryContext = createContext<
  BrowsingHistoryContextType | undefined
>(undefined);

export const BrowsingHistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedHistory = localStorage.getItem('browsingHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('browsingHistory', JSON.stringify(history));
    }
  }, [history, isMounted]);

  const addHistory = (productId: string) => {
    setHistory((prevHistory) => {
      const newHistory = [productId, ...prevHistory.filter((id) => id !== productId)];
      // Limit history to last 20 items
      return newHistory.slice(0, 20);
    });
  };

  const value = {
    history,
    addHistory,
  };

  return (
    <BrowsingHistoryContext.Provider value={value}>
      {children}
    </BrowsingHistoryContext.Provider>
  );
};

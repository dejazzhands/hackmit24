"use client";

import { createContext, useState } from "react";

interface SpidermanContextType {
  isSpiderman: boolean;
  setIsSpiderman: (isSpiderman: boolean) => void;
}

export const SpidermanContext = createContext<SpidermanContextType | null>(
  null
);

export const SpidermanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSpiderman, setIsSpiderman] = useState(false);

  return (
    <SpidermanContext.Provider value={{ isSpiderman, setIsSpiderman }}>
      {children}
    </SpidermanContext.Provider>
  );
};


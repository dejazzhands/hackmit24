import { useContext } from "react";
import { SpidermanContext } from "./Spiderman";

export const useSpidermanContext = () => {
  const context = useContext(SpidermanContext);

  if (!context)
    throw new Error("This can only be used within SpidermanProvider");

  return context;
};

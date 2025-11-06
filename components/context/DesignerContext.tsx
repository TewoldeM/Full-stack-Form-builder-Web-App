"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

export const DesignereContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prevElements) => {
      const newElements = [...prevElements];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };
  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };
  return (
    <DesignereContext.Provider value={{ elements, addElement, removeElement,selectedElement,setSelectedElement }}>
      {children}
    </DesignereContext.Provider>
  );
}

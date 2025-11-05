"use client"

import { createContext, ReactNode, useState } from "react"
import {FormElementInstance } from "../FormElements"

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: { id: string } => void: any;
}

export const DesignereContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider({ children }: { children:ReactNode }) {
    const [elements, setElements] = useState<FormElementInstance[]>([])
    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prevElements) => {
            const newElements = [...prevElements];
            newElements.splice(index, 0, element);
            return newElements;
        });
    }
    const removeElement = (id: string) => {
        setElements((prev)=>prev.filter((element)=>element.id !== id))
    }
    return (

        <DesignereContext.Provider value={{ elements, addElement, removeElement }}>
            {children}
        </DesignereContext.Provider>
    )
}
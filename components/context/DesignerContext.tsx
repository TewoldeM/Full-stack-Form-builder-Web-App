"use client"

import { createContext } from "react"
import {FormElementInstance } from "../FormElements"

type DesignerContextType = {
    elements: FormElementInstance[]
    addElement:(index:number,element:FormElementInstance)=>void
}

export const DesignereContext=createContext<DesignerContextType | null>(null)
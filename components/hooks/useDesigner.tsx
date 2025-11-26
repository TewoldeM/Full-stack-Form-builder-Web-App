"use client";

import React, { useContext } from "react";
import { DesignereContext } from "../context/DesignerContext";

export default function useDesigner() {
  const context = useContext(DesignereContext);
  if (!context) {
    throw new Error(
      "useDesigner must be used within a DesignerContextProvider"
    );
  }
  return context;
};



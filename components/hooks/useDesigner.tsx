"use client";

import React, { useContext } from "react";
import { DesignereContext } from "../context/DesignerContext";

const useDesigner = () => {
  const context = useContext(DesignereContext);
  if (!context) {
    throw new Error(
      "useDesigner must be used within a DesignerContextProvider"
    );
  }
  return context;
};

export default useDesigner;

"use client"

import React, { useContext } from 'react'
import { DesignereContext } from '../context/DesignerContext';

const useDesignere = () => {
    const context = useContext(DesignereContext);
    if (!context) {
        throw new Error("useDesignere must be used within a DesignerContextProvider");
    }
  return (
    <div>useDesignere</div>
  )
}

export default useDesignere
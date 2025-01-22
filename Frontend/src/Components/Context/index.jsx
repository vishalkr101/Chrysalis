import React, { createContext, useState } from "react";

export const DishContext = createContext();

export const DishProvider = ({ children, value }) => {
  return (
    <DishContext.Provider value={value}>
      {children}
    </DishContext.Provider>
  );
};

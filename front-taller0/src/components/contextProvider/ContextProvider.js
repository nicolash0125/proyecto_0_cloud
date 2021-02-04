import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const ContextProvider = (props) => {
  const [data, setData] = useState({
    sesion:false,idEvento:1
  });

  return (
    <AppContext.Provider value={[data, setData]}>
      {props.children}
    </AppContext.Provider>
  );
};

import { createContext, useState, useEffect } from "react";

export const GlobalMsgContext = createContext();

const GlobalMsgContextProvider = ({ children }) => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (msg) {
      alert(msg);
    }
  }, [msg]);

  return (
    <GlobalMsgContext.Provider value={{ msg, setMsg }}>
      {children}
    </GlobalMsgContext.Provider>
  );
};

export default GlobalMsgContextProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookie from "universal-cookie";
const AppContext = createContext<any>({});
const cookie = new Cookie();

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = cookie.get("user");
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser } as any}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext };

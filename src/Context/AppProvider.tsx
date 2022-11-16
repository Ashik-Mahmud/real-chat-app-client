import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { useCookies } from "react-cookie";
import GlobalLoading from "../components/GlobalLoading";
import { server_url } from "../config/config";
const AppContext = createContext<any>({});

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [cookies] = useCookies(["user"]);

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUser(cookies?.user);
  }, [cookies]);

  useEffect(() => {
    (async () => {
      if (user) {
        setIsLoading(true);
        const { data } = await axios.get(`${server_url}/user/me`, {
          headers: {
            authorization: `Bearer ${(user as any).token}`,
          },
        });
        setUserInfo(data?.user);
        setIsLoading(false);
      }
    })();
  }, [user]);

  if (isLoading) return <GlobalLoading />;

  return (
    <AppContext.Provider value={{ user, userInfo, setUser } as any}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext };

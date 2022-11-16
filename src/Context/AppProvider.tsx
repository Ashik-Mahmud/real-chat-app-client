import React, { createContext, useContext, useEffect, useState } from "react";
import Cookie from "universal-cookie";
import { useGetMeQuery } from "../api/AuthenticationApi";
import GlobalLoading from "../components/GlobalLoading";
const AppContext = createContext<any>({});
const cookie = new Cookie();

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const { data, isLoading } = useGetMeQuery({});

  console.log(userInfo);

  useEffect(() => {
    const user = cookie.get("user");
    if (user) {
      setUser(user);
    }
    if (data) {
      setUserInfo(data?.user);
    }
  }, [data]);
  if (isLoading) {
    return <GlobalLoading />;
  }
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

import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
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
  const [selectedChat, setSelectedChat] = useState(null);
  const [sentMsgRefetch, setSentMsgRefetch] = useState({
    refetch: () => {},
  });

  const { data: userInfoData, isLoading: userInfoLoading } = useQuery(
    ["user", user],
    async () => {
      if ((user as any)?.token) {
        const { data } = await axios.get(`${server_url}/user/me`, {
          headers: {
            Authorization: `Bearer ${(user as any)?.token}`,
          },
        });
        return data;
      }
    }
  );

  useEffect(() => {
    setUser(cookies?.user);
  }, [cookies]);

  useEffect(() => {
    setUserInfo(userInfoData?.user);
  }, [userInfoData]);

  if (userInfoLoading) return <GlobalLoading />;

  return (
    <AppContext.Provider
      value={
        {
          user,
          userInfo,
          setUser,
          selectedChat,
          setSelectedChat,
          setSentMsgRefetch,
          sentMsgRefetch,
        } as any
      }
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext };

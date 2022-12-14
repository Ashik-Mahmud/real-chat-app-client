import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import io from "socket.io-client";
import GlobalLoading from "../components/GlobalLoading";
import { server_url } from "../config/config";
const ENDPOINTS = "https://real-chat-app.onrender.com";

const AppContext = createContext<any>({});

type Props = {
  children: React.ReactNode;
};
const socket = io(ENDPOINTS);
const AppProvider = ({ children }: Props) => {
  const [cookies] = useCookies(["user"]);

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState<string>("");
  const [notificationList, setNotificationList] = useState<any>([]);
  const [refetchFunc, setRefetchFunc] = useState({
    msgRefetch: () => {},
    chatRefetch: () => {},
  });

  const {
    data: userInfoData,
    isLoading: userInfoLoading,
    refetch: userInfoRefetch,
  } = useQuery(["user", user], async () => {
    if ((user as any)?.token) {
      const { data } = await axios.get(`${server_url}/user/me`, {
        headers: {
          Authorization: `Bearer ${(user as any)?.token}`,
        },
      });
      return data;
    }
  });

  useEffect(() => {
    setUser(cookies?.user);
  }, [cookies]);

  useEffect(() => {
    setUserInfo(userInfoData?.user);
  }, [userInfoData]);

  useEffect(() => {
    if (userInfo) {
      socket.emit("setup", userInfo);
      socket.on("connect", () => setIsSocketConnected(true));
    }
  }, [userInfo]);

  if (userInfoLoading) return <GlobalLoading />;

  const value = {
    user,
    userInfo,
    setUser,
    selectedChat,
    setSelectedChat,
    refetchFunc,
    setRefetchFunc,
    userInfoRefetch,
    socket,
    isSocketConnected,
    notificationList,
    setNotificationList,
    isTyping,
    setIsTyping,
  };

  return (
    <AppContext.Provider value={value as any}>{children}</AppContext.Provider>
  );
};

export default AppProvider;

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext };

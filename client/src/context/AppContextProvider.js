import React from "react";
import UserProvider from "./UserContext";
import GroupProvider from "./GroupContext";
import SongProvider from "./SongContext";
import MemberProvider from "./MemberContext";
import LoadingProvider from "./LoadingContext";

const AppContextProvider = ({ children }) => {
  const providers = [
    UserProvider,
    GroupProvider,
    SongProvider,
    MemberProvider,
    LoadingProvider,
  ];

  return providers.reduce(
    (children, Provider) => <Provider>{children}</Provider>,
    children
  );
};

export default AppContextProvider;

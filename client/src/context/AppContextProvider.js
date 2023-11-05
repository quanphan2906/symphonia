import React from "react";
import UserProvider from "./UserContext";
import GroupProvider from "./GroupContext";
import SongProvider from "./SongContext";
import SongTagProvider from "./SongTagContext";

const AppContextProvider = ({ children }) => {
  const providers = [
    UserProvider,
    GroupProvider,
    SongProvider,
    SongTagProvider,
  ];

  return providers.reduce(
    (children, Provider) => <Provider>{children}</Provider>,
    children
  );
};

export default AppContextProvider;

import React from "react";
import UserProvider from "./UserContext";
import GroupProvider from "./GroupContext";
import SongProvider from "./SongContext";

const AppContextProvider = ({ children }) => {
  const providers = [UserProvider, GroupProvider, SongProvider];

  return providers.reduce(
    (children, Provider) => <Provider>{children}</Provider>,
    children
  );
};

export default AppContextProvider;

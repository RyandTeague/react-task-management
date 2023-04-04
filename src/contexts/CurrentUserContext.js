import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const CurrentUserTokken = createContext();
export const SetCurrentUserContext = createContext();


export const useCurrentUser = () => useContext(CurrentUserContext);
export const useCurrentTokken = () => useContext(CurrentUserTokken);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  // debugger
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTokken, setTokken] = useState(null);
  const history = useHistory();
  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
      setTokken(data.access_token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserTokken.Provider value={{currentTokken, setTokken}}>

      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
      </CurrentUserTokken.Provider>
    </CurrentUserContext.Provider>
  );
};
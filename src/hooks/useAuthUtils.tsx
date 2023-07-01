import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";

const useAuthUtils = () => {
  const [user, setUser] = useState<any>();
  const checkUserGroup = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("checkUserGroupuser", user);
      const group: string =
        user.signInUserSession.accessToken.payload["cognito:groups"][0];
      return group;
    } catch (error) {
      console.log("checkUserGroup error", error);
      return null;
    }
  };

  const getUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      return user;
    } catch (error) {
      console.log("getUser error", error);
      return null;
    }
  };
  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null);
      console.log("user", user);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return { checkUserGroup, user, signOut, setUser };
};
export default useAuthUtils;

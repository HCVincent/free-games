import { Auth } from "aws-amplify";
import { useState } from "react";

const authUtils = () => {
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
      console.log("getUseruser", user);
      return user;
    } catch (error) {
      console.log("getUser error", error);
      return null;
    }
  };
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return { checkUserGroup, getUser, signOut };
};
export default authUtils;

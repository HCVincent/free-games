import { Auth } from "aws-amplify";

const checkUserGroup = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const group: string =
      user.signInUserSession.accessToken.payload["cognito:groups"][0];
    return group;
  } catch (error) {
    console.log("checkUserGroup error", error);
    return null;
  }
};

export default checkUserGroup;

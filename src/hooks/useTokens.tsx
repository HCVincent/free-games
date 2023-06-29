// import { Auth } from "aws-amplify";

// const useTokens = () => {
//   const checkUserGroup = async () => {
//     try {
//       const user = await Auth.currentAuthenticatedUser();
//       const group: string =
//         user.signInUserSession.accessToken.payload["cognito:groups"][0];
//       return group;
//     } catch (error) {
//       return null;
//     }
//   };

//   return { checkUserGroup };
// };

// export default useTokens;

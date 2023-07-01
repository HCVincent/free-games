import Image from "next/image";
import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsmobile from "../aws-exports";
import { Auth } from "aws-amplify";
import Layout from "@/components/Layout/Layout";
import authUtils from "@/utils/authUtils";
import useTokens from "@/hooks/useTokens";
Amplify.configure({ ...awsmobile, ssr: true });

export default function Home() {
  const { setJwtToken } = useTokens();
  const { checkUserGroup, getUser } = authUtils();
  const user = getUser();
  const [token, setToken] = useState("");
  const [usergroup, setUsergroup] = useState("");
  useEffect(() => {
    const getToken = async () => {
      try {
        const session = await Auth.currentSession();
        const jwtToken = session.getIdToken().getJwtToken();
        console.log("jwtToken", jwtToken);
        const userGroup = session.getAccessToken().payload["cognito:groups"];
        setToken(jwtToken);
        setJwtToken(jwtToken);
        setUsergroup(userGroup);
      } catch (error) {
        console.log("Error retrieving JWT token:", error);
      }
    };
    getToken();
  }, []);

  return (
    <Layout>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <p>Welcome {user?.username}</p>
            <p>usergroup {usergroup}</p>
            <p>token {token}</p>

            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </Layout>
  );
}

import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import useAuthUtils from "@/hooks/useAuthUtils";
import { useRouter } from "next/router";

const AdminHome: React.FC = () => {
  const router = useRouter();
  const { user, signOut } = useAuthUtils();

  const onSignOut = () => {
    console.log("signout");
    signOut();
    router.push("/");
  };

  return (
    <div>
      <div>
        {user?.username}
        <button onClick={onSignOut}>Sign out</button>
      </div>
    </div>
  );
};
export default AdminHome;

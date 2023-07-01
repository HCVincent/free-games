import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import authUtils from "@/utils/authUtils";

const AdminHome: React.FC = () => {
  const { getUser } = authUtils();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        // Handle error
      }
    };

    fetchUser();
  }, []);
  const signOut = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        {user?.username}
        <button>Sign out</button>
      </div>
    </div>
  );
};
export default AdminHome;

import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import useAuthUtils from "@/hooks/useAuthUtils";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import AdminHome from "@/components/Admin/AdminHome";

export default function AdminLogin() {
  const { checkUserGroup, user } = useAuthUtils();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const adminAuth = async () => {
      const group = await checkUserGroup();
      console.log("use effect");
      if (group === process.env.NEXT_PUBLIC_AUTH_ADMIN) {
        setIsAdmin(true);
        console.log("use effect:true");
      } else {
        setIsAdmin(false);
        console.log("use effect:false");
        console.log("isAdmin:", isAdmin);
      }
    };
    adminAuth();
  }, [user]);
  return isAdmin ? (
    <>
      <AdminHome />
    </>
  ) : (
    <>
      <div className="flex w-full h-screen justify-center items-center bg-base-100">
        <AuthModal setIsAdmin={setIsAdmin} />
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import authUtils from "@/utils/authUtils";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import AdminHome from "@/components/Admin/AdminHome";

export default function AdminLogin() {
  const { checkUserGroup } = authUtils();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const adminAuth = async () => {
      const group = await checkUserGroup();
      if (group === process.env.NEXT_PUBLIC_AUTH_ADMIN) {
        setIsAdmin(true);
      }
    };
    adminAuth();
  }, []);
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

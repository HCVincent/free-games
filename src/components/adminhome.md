import PageContent from "@/components/Layout/PageContent";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import authUtils from "@/utils/authUtils";

export default function AdminHome() {
  const { checkUserGroup } = authUtils();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUsersGroup = async () => {
      try {
        const group = await checkUserGroup();
        console.log("group", group);
        if (group !== "admins") {
          // Redirect if not in "admins" group
          if (router.pathname === "/admin/home") {
            router.push("/");
          }
        } else {
          setLoading(false); // Set loading to false if the user is in "admins" group
        }
      } catch (error) {
        console.log("Error checking user group:", error);
        setLoading(false); // Set loading to false if there is an error
      }
    };

    checkUsersGroup();
  }, [router]);
  return (
    <div className="flex w-full h-screen justify-center items-center bg-base-100">
      <PageContent>
        <>
          <Sidebar />
        </>
        <>he</>
      </PageContent>
    </div>
  );
}

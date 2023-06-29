import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import checkUserGroup from "@/utils/checkUserGroup";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(loginForm.email, loginForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      await Auth.signIn(email, password);
      const group: string | null = await checkUserGroup();
      console.log("group", group);
      if (group === "admins") {
        router.push("/admin/home");
      } else {
        await Auth.signOut();
      }
    } catch (error) {
      console.log("error signing in", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(false);
    const checkUser = async () => {
      try {
        const group: string | null = await checkUserGroup();
        console.log("group", group);
        if (group === "admins") {
          router.push("/admin/home");
        } else {
          await Auth.signOut();
        }
      } catch (error) {
        setLoading(false); // Set loading to false since we have finished checking for auto sign-in
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="flex w-full h-screen justify-center items-center bg-base-100">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              name="email"
              placeholder="email"
              type="email"
              className="input input-bordered"
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              placeholder="password"
              type="password"
              className="input input-bordered"
              onChange={onChange}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

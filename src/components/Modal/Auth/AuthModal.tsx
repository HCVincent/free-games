import { Auth } from "aws-amplify";
import router from "next/router";
import React, { useEffect, useState } from "react";
import useAuthUtils from "@/hooks/useAuthUtils";

type AuthModalProps = {
  setIsAdmin: (value: boolean) => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ setIsAdmin }) => {
  const { checkUserGroup } = useAuthUtils();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("onsubmit");
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
        setIsAdmin(true);
      } else {
        await Auth.signOut();
      }
    } catch (error) {
      console.log("error signing in", error);
    }
    setLoading(false);
  }

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
};
export default AuthModal;

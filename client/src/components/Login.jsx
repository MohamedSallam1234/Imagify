import { assets } from "../assets/assets.js";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

const login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin } = useContext(AppContext);
  useEffect(() => {
    // Prevent scrolling by hiding overflow
    document.body.style.overflow = "hidden";

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state === "Login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm">
          {" "}
          welcome back! please{state === "Login" ? "Login" : "Sign Up"} to
          continue
        </p>
        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img width={25} src={assets.profile_icon} alt=" user icon" />
            <input
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img width={20} src={assets.email_icon} alt=" user icon" />
          <input
            className="outline-none text-sm"
            type="text"
            placeholder="Email"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img width={20} src={assets.lock_icon} alt=" user icon" />
          <input
            className="outline-none text-sm"
            type="text"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot password?
        </p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "create account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don&#39;t have an account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="cross icon"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
};
export default login;

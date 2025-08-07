import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import app from "../auth/firebase";
import { useNavigate } from "react-router-dom"; //  import useNavigate

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); //  Toggle between sign up and login

  const auth = getAuth(app);
  const navigate = useNavigate(); //  initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Sign up successful");
        navigate("/dashboard"); // go to dashboard after signup
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful");
        navigate("/dashboard"); //  go to dashboard after login
      }
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        setLoginError("Email already in use. Try logging in.");
      } else if (error.code === "auth/wrong-password") {
        setLoginError("Incorrect password. Try again.");
      } else if (error.code === "auth/user-not-found") {
        setLoginError("User not found. Try signing up.");
      } else {
        setLoginError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Welcome Lumicho</h1>
            <p className="py-3">
              {isSignUp ? "Sign Up" : "Log In"} to continue
            </p>
          </div>
          <div className="card sm:w-[30rem] shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <button type="submit" className="btn btn-neutral mt-4">
                  {isSignUp ? "Sign Up" : "Log In"}
                </button>

                {/* Alert for errors */}
                {loginError && (
                  <div className="alert alert-error mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4.732a2 2 0 00-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Toggle text */}
                {/* <p className="mt-4 text-sm text-center">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <span
                    className="text-blue-500 cursor-pointer underline"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? "Log In" : "Sign Up"}
                  </span>
                </p> */}
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;

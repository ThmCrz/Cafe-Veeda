import React, { useEffect, useState } from "react";
import { now } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import icon from "../../assets/images/Cafe Veeda Logo.jpg";
import { sendAuthCode, forgotPass } from "../../utils/dataProvider/auth";
import useDocumentTitle from "../../utils/documentTitle";

const ForgotPass = () => {
  useDocumentTitle("Forgot Password");

  const controller = React.useMemo(() => new AbortController(), []);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);  
  const [error, setError] = useState("");
  const [resend, setResend] = useState(0);
  const [displaycd, setDisplaycd] = useState("");
  
  const [resetPassStep, setResetPassStep] = useState(1);
  
  const [email, setEmail] = useState("");
  
  const [authenticationCode, setAuthenticationCode] = useState("");
  const [authCodeRef, setAuthCodeRef] = useState("");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  useEffect(() => {
    // Check localStorage for resetPassStep
    const savedStep = parseInt(localStorage.getItem('resetPassStep'), 10);
    if (savedStep) {
      setResetPassStep(savedStep);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resetPassStep', resetPassStep);
  }, [resetPassStep]);

  const handleSendEmail = (e) => {
    e.preventDefault();
    toast.dismiss();
    setIsLoading(true);
    const sixDigitCode = Math.floor(100000 + Math.random() * 900000);
    const currentAuthCodeRef = sixDigitCode.toString();
    setAuthCodeRef(currentAuthCodeRef);

    sendAuthCode(email, currentAuthCodeRef, "forgotPass", controller).then((res) => {
      toast.promise(
        Promise.resolve(res.data),
        {
          loading: "Please wait a moment",
          success: "We sent a code to your email!",
          error: (err) => {
            setIsLoading(false);
            const errorMsg = err.response?.data?.msg || "An unexpected error occurred";
            setError(errorMsg);
            return errorMsg;
          },
        }
      );
      setIsLoading(false);
      setResend(now() + 2 * 60 * 1000);
      setResetPassStep(2);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (resend > now()) {
        const newSec = resend - now();
        setDisplaycd(countdownFormat(newSec));
      } else {
        setDisplaycd("");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resend]);

const handleResendCode = () => {
    setIsLoading(true);
    sendAuthCode(email, authCodeRef, "forgotPass", controller).then((res) => {
      toast.promise(
        Promise.resolve(res.data),
        {
          loading: "Please wait a moment",
          success: "We resent your authentication code to your email!",
          error: (err) => {
            setIsLoading(false);
            const errorMsg = err.response?.data?.msg || "An unexpected error occurred";
            setError(errorMsg);
            return errorMsg;
          },
        }
      );
    });
    setIsLoading(false);
    setResend(now() + 2 * 60 * 1000);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    handleAuthentication();
  };

const handleAuthentication = () =>{
    toast.dismiss();
    if(authenticationCode === authCodeRef){
      toast.success("Authentication successful!");
      setResetPassStep(3);
    }else if (authenticationCode !== authCodeRef){
      toast.error("Authentication code is incorrect");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      if (newPassword === confirmPassword) {
        // Disable button and show loading state
        e.target.disabled = true;
        setIsLoading(true);
  
        // Call forgotPass function and await its result
        const result = await forgotPass(email, newPassword, controller);
  
        // Handle success case
        toast.promise(
          Promise.resolve(result), // Assuming result is the response object
          {
            loading: "Please wait a moment",
            success: () => {
              navigate("/auth/login", { replace: true });
              return "Password reset successful! You can login now";
            },
            error: (err) => {
              return err.message || "An error occurred";
            },
          },
          { success: { duration: Infinity }, error: { duration: Infinity } }
        );
  
      } else {
        toast.error("Passwords do not match");
      }
    } catch (error) {
      // Handle any error that occurs during the process
      setIsLoading(false);
      e.target.disabled = false;
      toast.error("An error occurred");
    }
  };
  
  const countdownFormat = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <header className="flex justify-center mb-10">
        <Link to="/">
          <div className="font-extrabold flex flex-row justify-center gap-4">
            <img src={icon} alt="logo" width="30px" />
            <h1 className="text-xl">Cafe Veeda</h1>
          </div>
        </Link>
      </header>
      <section className="mt-16">
        {resetPassStep === 1 && (
          <form
            onSubmit={handleSendEmail}
            className="space-y-4 md:space-y-6 relative"
          >
            <div className="space-y-5">
              <h2 className="font-bold text-3xl text-center">
                Forgot your password?
              </h2>
              <p className="text-xl text-center">
                Don’t worry, we got your back!
              </p>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                className={`border-gray-400 border-2 rounded-2xl p-3 w-full mt-2 ${error !== "" ? "border-red-500" : ""}`}
                placeholder="Enter your email address to get an Authentication Code"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
                {error}
              </span>
            </div>
            <button
              type="submit"
              className="w-full text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
              disabled={isLoading}
            >
               {isLoading ? "Sending...":"Send"}
            </button>
          </form>
        )}

        {resetPassStep === 2 && (
          <div>
            <form
            onSubmit={handleCodeSubmit}
            className="space-y-4 md:space-y-6 relative"
          >
            <div className="space-y-5">
              <h2 className="font-bold text-3xl text-center">
                Forgot your password?
              </h2>
              <p className="text-xl text-center">
                We’ve sent an Authentication code to your email
              </p>
            </div>
            <div>
              <label htmlFor="authenticationCode">Authentication Code:</label>
              <input
                type="number"
                name="authenticationCode"
                id="authenticationCode"
                className={`border-gray-400 border-2 rounded-2xl p-3 w-full mt-2 ${error !== "" ? "border-red-500" : ""}`}
                placeholder="Enter your Authentication Code"
                value={authenticationCode}
                onChange={(e) => setAuthenticationCode(e.target.value)}
              />
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
                {error}
              </span>
            </div>
            <button
              type="submit"
              className="w-full text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Submit"}
            </button>
          </form>

          <section className="text-center mt-10 space-y-2">
            <p>Click here if you didn’t receive any link in 2 minutes</p>
            <button
              type="button"
              className="w-full text-white bg-tertiary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
              onClick={handleResendCode}
              disabled={resend >= now()}
            >
              Resend Link {displaycd}
            </button>
        </section>
          </div>
        )}

        {resetPassStep === 3 && (
          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-4 md:space-y-6 relative"
          >
            <div className="space-y-5">
              <h2 className="font-bold text-3xl text-center">
                Forgot your password?
              </h2>
              <p className="text-xl text-center">
                We’ve found your account, you may now reset your password!
              </p>
            </div>
            <div>
              <label htmlFor="password1">New Password:</label>
              <input
                type="password"
                name="password1"
                id="password1"
                className={`border-gray-400 border-2 rounded-2xl p-3 w-full mt-2 ${error !== "" ? "border-red-500" : ""}`}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor="password2">Confirm New Password:</label>
              <input
                type="password"
                name="password2"
                id="password2"
                className={`border-gray-400 border-2 rounded-2xl p-3 w-full mt-2 ${error !== "" ? "border-red-500" : ""}`}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
                {error}
              </span>
            </div>
            <button
              type="submit"
              className="w-full text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl"
            >
              Submit
            </button>
          </form>
        )}

        {resetPassStep === 4 && (
          <div className="text-center mt-10 space-y-2">
            <p>
              We’ve reset your password! You can now log in with your new
              credentials.
            </p>
            <Link to="/auth/login">
              <button className="w-full text-white bg-tertiary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-2xl text-lg p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-xl">
                Log In
              </button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default ForgotPass;

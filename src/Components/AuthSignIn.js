import React, { useRef, useState, useEffect } from "react";
import "./AuthSignIn.css";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import mail from "../assets/icons/mail.json";
import lock from "../assets/icons/lock.json";
import infinity from "../assets/icons/infinity.json";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useStateValue } from "../StateProvider";

function AuthSignIn() {
  const mailLottieRef = useRef();
  const [mailFocused, setMailFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const handleMailMouseEnter = () => {
    if (!mailFocused) {
      mailLottieRef.current.setDirection(1);
      mailLottieRef.current.play();
    }
  };

  const handleMailMouseLeave = () => {
    if (!mailFocused) {
      mailLottieRef.current.setDirection(-1);
      mailLottieRef.current.play();
    }
  };

  const handleMailFocus = () => {
    setMailFocused(true);
    mailLottieRef.current.setDirection(1);
    mailLottieRef.current.play();
  };

  const handleMailBlur = () => {
    setMailFocused(false);
    mailLottieRef.current.setDirection(-1);
    mailLottieRef.current.play();
  };

  const lockLottieRef = useRef();
  const [lockFocused, setLockFocused] = useState(false);

  const handleLockMouseEnter = () => {
    if (!lockFocused) {
      lockLottieRef.current.setDirection(1);
      lockLottieRef.current.play();
    }
  };

  const handleLockMouseLeave = () => {
    if (!lockFocused) {
      lockLottieRef.current.setDirection(-1);
      lockLottieRef.current.play();
    }
  };

  const handleLockFocus = () => {
    setLockFocused(true);
    lockLottieRef.current.setDirection(1);
    lockLottieRef.current.play();
  };

  const handleLockBlur = () => {
    setLockFocused(false);
    lockLottieRef.current.setDirection(-1);
    lockLottieRef.current.play();
  };

  const [remember, setRemember] = useState(false);

  // Sign in with email/password - keeping the authentication functionality
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Set persistence based on "Remember me" checkbox
      const persistenceType = remember
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistenceType);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update global state
      dispatch({
        type: "SET_USER",
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || email.split("@")[0],
        },
      });

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      // Convert Firebase errors to user-friendly messages
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Please try again later");
          break;
        default:
          setError("Failed to sign in. Please check your credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is already signed in, redirect to homepage
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="authSignIn">
      <Link to="/" className="authSignIn__logo-link">
        <div className="authSignIn__logo" tabIndex={0} aria-label="Home">
          <h1>Kartigo</h1>
        </div>
      </Link>
      <div className="authSignIn__container">
        <h1>Login</h1>

        {/* Only show error if there is one */}
        {error && <div className="authSignIn__error">{error}</div>}

        <form className="authSignIn__form" onSubmit={handleSignIn}>
          <div
            className={`authSignIn__input-group${
              mailFocused ? " focused" : ""
            }`}
            onMouseEnter={handleMailMouseEnter}
            onMouseLeave={handleMailMouseLeave}
          >
            <input
              className="authSignIn__input-email"
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter Email"
              onFocus={handleMailFocus}
              onBlur={handleMailBlur}
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Lottie
              className="authSignIn__icon-email"
              lottieRef={mailLottieRef}
              animationData={mail}
              loop={false}
              autoplay={false}
            />
          </div>

          <div
            className={`authSignIn__input-group${
              lockFocused ? " focused" : ""
            }`}
            onMouseEnter={handleLockMouseEnter}
            onMouseLeave={handleLockMouseLeave}
          >
            <input
              className="authSignIn__input-password"
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter Password"
              onFocus={handleLockFocus}
              onBlur={handleLockBlur}
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Lottie
              className="authSignIn__icon-password"
              lottieRef={lockLottieRef}
              animationData={lock}
              loop={false}
              autoplay={false}
            />
          </div>
        </form>

        <label className="authSignIn__remember-me">
          <input
            type="checkbox"
            className="authSignIn__checkbox"
            checked={remember}
            onChange={() => setRemember((prev) => !prev)}
          />
          <span>Remember me</span>
        </label>

        <button
          onClick={handleSignIn}
          className="authSignIn__sign-in-btn"
          disabled={loading}
        >
          {loading ? (
            <span className="authSignIn__loading">
              <Lottie
                className="authSignIn__loading-animation"
                animationData={infinity}
                loop={true}
                autoplay={true}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="authSignIn__signup-link">
          Don&apos;t have an account?{" "}
          <Link to="/auth/signup" className="authSignIn__signup-link-text">
            Sign up
          </Link>
        </div>

        <div className="authSignIn__forgot-password">
          <Link
            to="/auth/reset-password"
            className="authSignIn__forgot-password-link"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthSignIn;

import React, { useRef, useState, useEffect } from "react";
import "./AuthSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import mail from "../assets/icons/mail.json";
import lock from "../assets/icons/lock.json";
import userPlus from "../assets/icons/userPlus.json";
import infinity from "../assets/icons/infinity.json";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useStateValue } from "../StateProvider";

function AuthSignUp() {
  // State variables for form fields and authentication
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  // Name input animation
  const userLottieRef = useRef();
  const [userFocused, setUserFocused] = useState(false);

  const handleUserMouseEnter = () => {
    if (!userFocused) {
      userLottieRef.current.setDirection(1);
      userLottieRef.current.play();
    }
  };

  const handleUserMouseLeave = () => {
    if (!userFocused) {
      userLottieRef.current.setDirection(-1);
      userLottieRef.current.play();
    }
  };

  const handleUserFocus = () => {
    setUserFocused(true);
    userLottieRef.current.setDirection(1);
    userLottieRef.current.play();
  };

  const handleUserBlur = () => {
    setUserFocused(false);
    userLottieRef.current.setDirection(-1);
    userLottieRef.current.play();
  };

  // Email/Phone input animation
  const mailLottieRef = useRef();
  const [mailFocused, setMailFocused] = useState(false);

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

  // Password input animation
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

  // Confirm password input animation (reuse lock icon)
  const confirmLockLottieRef = useRef();
  const [confirmLockFocused, setConfirmLockFocused] = useState(false);

  const handleConfirmLockMouseEnter = () => {
    if (!confirmLockFocused) {
      confirmLockLottieRef.current.setDirection(1);
      confirmLockLottieRef.current.play();
    }
  };

  const handleConfirmLockMouseLeave = () => {
    if (!confirmLockFocused) {
      confirmLockLottieRef.current.setDirection(-1);
      confirmLockLottieRef.current.play();
    }
  };

  const handleConfirmLockFocus = () => {
    setConfirmLockFocused(true);
    confirmLockLottieRef.current.setDirection(1);
    confirmLockLottieRef.current.play();
  };

  const handleConfirmLockBlur = () => {
    setConfirmLockFocused(false);
    confirmLockLottieRef.current.setDirection(-1);
    confirmLockLottieRef.current.play();
  };

  const [remember, setRemember] = useState(false);

  // Sign up with email/password functionality
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password should be at least 6 characters");
    }

    setLoading(true);

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, {
        displayName: name,
      });

      // Update global state
      dispatch({
        type: "SET_USER",
        user: {
          uid: user.uid,
          email: user.email,
          displayName: name,
        },
      });

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already in use. Please sign in instead");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/weak-password":
          setError("Password is too weak");
          break;
        default:
          setError("Failed to create account. Please try again");
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
    <div className="authSignUp">
      <Link to="/" className="authSignUp__logo-link">
        <div className="authSignUp__logo" tabIndex={0} aria-label="Home">
          <h1>Kartigo</h1>
        </div>
      </Link>
      <div className="authSignUp__container">
        <h1>Sign Up</h1>

        {/* Display error message if there is one */}
        {error && <div className="authSignUp__error">{error}</div>}

        <form className="authSignUp__form">
          {/* Name input with userPlus icon */}
          <div
            className={`authSignUp__input-group${
              userFocused ? " focused" : ""
            }`}
            onMouseEnter={handleUserMouseEnter}
            onMouseLeave={handleUserMouseLeave}
          >
            <input
              className="authSignUp__input-name"
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter Name"
              aria-label="Name"
              onFocus={handleUserFocus}
              onBlur={handleUserBlur}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Lottie
              className="authSignUp__icon-user"
              lottieRef={userLottieRef}
              animationData={userPlus}
              loop={false}
              autoplay={false}
            />
          </div>

          {/* Email/Phone input */}
          <div
            className={`authSignUp__input-group${
              mailFocused ? " focused" : ""
            }`}
            onMouseEnter={handleMailMouseEnter}
            onMouseLeave={handleMailMouseLeave}
          >
            <input
              className="authSignUp__input-email"
              type="email"
              id="emailOrPhone"
              name="emailOrPhone"
              required
              placeholder="Email"
              onFocus={handleMailFocus}
              onBlur={handleMailBlur}
              aria-label="Email or Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Lottie
              className="authSignUp__icon-email"
              lottieRef={mailLottieRef}
              animationData={mail}
              loop={false}
              autoplay={false}
            />
          </div>

          {/* Password input */}
          <div
            className={`authSignUp__input-group${
              lockFocused ? " focused" : ""
            }`}
            onMouseEnter={handleLockMouseEnter}
            onMouseLeave={handleLockMouseLeave}
          >
            <input
              className="authSignUp__input-password"
              type="password"
              id="password"
              name="password"
              required
              placeholder="New Password"
              onFocus={handleLockFocus}
              onBlur={handleLockBlur}
              aria-label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lottie
              className="authSignUp__icon-password"
              lottieRef={lockLottieRef}
              animationData={lock}
              loop={false}
              autoplay={false}
            />
          </div>

          {/* Confirm Password input */}
          <div
            className={`authSignUp__input-group${
              confirmLockFocused ? " focused" : ""
            }`}
            onMouseEnter={handleConfirmLockMouseEnter}
            onMouseLeave={handleConfirmLockMouseLeave}
          >
            <input
              className="authSignUp__input-password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Confirm Password"
              onFocus={handleConfirmLockFocus}
              onBlur={handleConfirmLockBlur}
              aria-label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Lottie
              className="authSignUp__icon-password"
              lottieRef={confirmLockLottieRef}
              animationData={lock}
              loop={false}
              autoplay={false}
            />
          </div>
        </form>

        <label className="authSignUp__remember-me">
          <input
            type="checkbox"
            className="authSignUp__checkbox"
            checked={remember}
            onChange={() => setRemember((prev) => !prev)}
          />
          <span>Remember me</span>
        </label>

        <button
          onClick={handleSignUp}
          className="authSignUp__sign-in-btn"
          disabled={loading}
        >
          {loading ? (
            <span className="authSignUp__loading">
              <Lottie
                className="authSignUp__loading-animation"
                animationData={infinity}
                loop={true}
                autoplay={true}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              Creating Account...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>

        <div className="authSignUp__signup-link">
          Already have an account?{" "}
          <Link to="/auth/signin" className="authSignUp__signup-link-text">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthSignUp;

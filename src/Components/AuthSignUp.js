import React, { useRef, useState } from "react";
import "./AuthSignUp.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import mail from "../assets/icons/mail.json";
import lock from "../assets/icons/lock.json";
import userPlus from "../assets/icons/userPlus.json"; // <-- import userPlus

function AuthSignUp() {
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

  return (
    <div className="authSignUp">
      <Link to="/" className="authSignUp__logo-link">
        <div className="authSignUp__logo" tabIndex={0} aria-label="Home">
          <h1>Kartigo</h1>
        </div>
      </Link>
      <div className="authSignUp__container">
        <h1>Sign Up</h1>
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
              type="text"
              id="emailOrPhone"
              name="emailOrPhone"
              required
              placeholder="Email"
              onFocus={handleMailFocus}
              onBlur={handleMailBlur}
              aria-label="Email or Phone"
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
        <button type="submit" className="authSignUp__sign-in-btn">
          Sign Up
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

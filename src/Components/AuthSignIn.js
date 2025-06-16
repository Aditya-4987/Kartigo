import React, { useRef, useState } from "react";
import "./AuthSignIn.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import mail from "../assets/icons/mail.json";
import lock from "../assets/icons/lock.json";

function AuthSignIn() {
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

  return (
    <div className="authSignIn">
      <Link to="/" className="authSignIn__logo-link">
        <div className="authSignIn__logo" tabIndex={0} aria-label="Home">
          <h1>Kartigo</h1>
        </div>
      </Link>
      <div className="authSignIn__container">
        <h1>Login</h1>
        <form className="authSignIn__form">
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
            />

            <Lottie
              className="authSignIn__icon-password"
              lottieRef={lockLottieRef}
              animationData={lock}
              loop={false}
              autoplay={false}
            />
          </div>

          {/* Sign In Button */}
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
        <button type="submit" className="authSignIn__sign-in-btn">
          Sign In
        </button>
        <div className="authSignIn__signup-link">
          Don&apos;t have an account?{" "}
          <Link to="/auth/signup" className="authSignIn__signup-link-text">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthSignIn;

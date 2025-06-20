import React, { useRef, useState } from "react";
import "./PasswordReset.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import mail from "../assets/icons/mail.json";
import infinity from "../assets/icons/infinity.json"; // Import the infinity animation
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function PasswordReset() {
  const mailLottieRef = useRef();
  const [mailFocused, setMailFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email inbox.");
    } catch (error) {
      console.error("Reset password error:", error);

      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        default:
          setError("Failed to send reset email. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="passwordReset">
      <Link to="/" className="passwordReset__logo-link">
        <div className="passwordReset__logo" tabIndex={0} aria-label="Home">
          <h1>Kartigo</h1>
        </div>
      </Link>
      <div className="passwordReset__container">
        <h1>Reset Password</h1>
        <p className="passwordReset__description">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {error && <div className="passwordReset__error">{error}</div>}
        {message && <div className="passwordReset__message">{message}</div>}

        <form className="passwordReset__form" onSubmit={handleResetPassword}>
          <div
            className={`passwordReset__input-group${
              mailFocused ? " focused" : ""
            }`}
            onMouseEnter={handleMailMouseEnter}
            onMouseLeave={handleMailMouseLeave}
          >
            <input
              className="passwordReset__input-email"
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
              className="passwordReset__icon-email"
              lottieRef={mailLottieRef}
              animationData={mail}
              loop={false}
              autoplay={false}
            />
          </div>
        </form>
        <button
          type="submit"
          className="passwordReset__submit-btn"
          disabled={loading}
          onClick={handleResetPassword}
        >
          {loading ? (
            <span className="passwordReset__loading">
              <Lottie
                className="passwordReset__loading-animation"
                animationData={infinity}
                loop={true}
                autoplay={true}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              Sending Reset Link...
            </span>
          ) : (
            "Send Reset Link"
          )}
        </button>

        <div className="passwordReset__back-link">
          <Link to="/auth/signin" className="passwordReset__back-link-text">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;

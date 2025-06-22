import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
// Import animations, but with error handling
import menuV4 from "../assets/icons/menuV4.json";
import userPlus from "../assets/icons/userPlus.json";
import searchToX from "../assets/icons/searchToX.json";
import cart from "../assets/icons/cart.json";
import userAvatar from "../assets/icons/userAvatar.json";
import "./Header.css";
import ShinyText from "../assets/ReactBits/TextAnimations-files/ShinyText/ShinyText";
import { useStateValue } from "../StateProvider";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function Header() {
  const menuLottieRef = useRef();
  const userLottieRef = useRef();
  const searchLottieRef = useRef();
  const cartLottieRef = useRef();
  const userAvatarLottieRef = useRef();
  const [searchFocused, setSearchFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuTimeoutRef = useRef(null);
  const userMenuTimeoutRef = useRef(null);
  const [{ user, cart: cartItems }, dispatch] = useStateValue();
  const [prevCartCount, setPrevCartCount] = useState(0);
  const [cartCountAnimating, setCartCountAnimating] = useState(false);
  const navigate = useNavigate();

  // Initialize animations with error handling
  useEffect(() => {
    // Replace direct animation calls with safe versions
    const timer = setTimeout(() => {
      if (menuLottieRef.current) menuLottieRef.current.pause();
      if (userLottieRef.current) userLottieRef.current.pause();
      if (searchLottieRef.current) searchLottieRef.current.pause();
      if (cartLottieRef.current) cartLottieRef.current.pause();
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    return () => {
      clearTimeout(menuTimeoutRef.current);
      clearTimeout(userMenuTimeoutRef.current);
    };
  }, []);

  // Menu handlers with delay
  const handleMenuMouseEnter = () => {
    clearTimeout(menuTimeoutRef.current);
    if (menuLottieRef.current) {
      menuLottieRef.current.setDirection(1);
      menuLottieRef.current.play();
      setMenuOpen(true);
    }
  };

  const handleMenuMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      if (menuLottieRef.current) {
        menuLottieRef.current.setDirection(-1);
        menuLottieRef.current.play();
      }
      setMenuOpen(false);
    }, 300);
  };

  // Cart handlers
  const handleCartMouseEnter = () => {
    if (cartLottieRef.current) {
      cartLottieRef.current.goToAndStop(0, true); // Reset to first frame
      cartLottieRef.current.setDirection(1);
      cartLottieRef.current.play();
    }
  };

  // User menu handlers - improved to ensure dropdown stays open
  const handleUserMouseEnter = () => {
    clearTimeout(userMenuTimeoutRef.current);
    if (userLottieRef.current) {
      userLottieRef.current.setDirection(1);
      userLottieRef.current.play();
    }
    if (user) {
      setUserMenuOpen(true);
    }
  };

  const handleUserMouseLeave = () => {
    userMenuTimeoutRef.current = setTimeout(() => {
      if (userLottieRef.current) {
        userLottieRef.current.setDirection(-1);
        userLottieRef.current.play();
      }
      if (user) {
        setUserMenuOpen(false);
      }
    }, 500); // Increased delay for dropdown to stay open longer
  };

  // Search icon logic
  const handleSearchMouseEnter = () => {
    if (!searchFocused && searchLottieRef.current) {
      searchLottieRef.current.setDirection(1);
      searchLottieRef.current.play();
    }
  };

  const handleSearchMouseLeave = () => {
    if (!searchFocused && searchLottieRef.current) {
      searchLottieRef.current.setDirection(-1);
      searchLottieRef.current.play();
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (searchLottieRef.current) {
      searchLottieRef.current.setDirection(1);
      searchLottieRef.current.play();
    }
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
    if (searchLottieRef.current) {
      searchLottieRef.current.setDirection(-1);
      searchLottieRef.current.play();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Clean up all timeouts
  useEffect(() => {
    return () => {
      clearTimeout(menuTimeoutRef.current);
      clearTimeout(userMenuTimeoutRef.current);
    };
  }, []);

  // User avatar animation handlers (optional, for hover/focus)
  const handleUserAvatarMouseEnter = () => {
    if (userAvatarLottieRef.current) {
      userAvatarLottieRef.current.goToAndStop(0, true);
      userAvatarLottieRef.current.setDirection(1);
      userAvatarLottieRef.current.play();
    }
  };

  // Add this effect to handle cart count animation
  useEffect(() => {
    if (cartItems && cartItems.length !== prevCartCount) {
      // Only animate if the count has changed
      if (prevCartCount !== 0) {
        // Don't animate on first load
        setCartCountAnimating(true);
        setTimeout(() => setCartCountAnimating(false), 300);
      }
      setPrevCartCount(cartItems.length);
    }
  }, [cartItems, prevCartCount]);

  return (
    <nav className="header" aria-label="Main navigation">
      <Link to="/" className="header__logo-link">
        <div className="header__logo" tabIndex={0} aria-label="Home">
          <h1>Kartigo</h1>
        </div>
      </Link>

      <div className="header__menu-container">
        <div
          className="header__menu"
          tabIndex={0}
          aria-label="Open menu"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
          onFocus={handleMenuMouseEnter}
          onBlur={handleMenuMouseLeave}
        >
          <Lottie
            lottieRef={menuLottieRef}
            animationData={menuV4}
            loop={false}
            autoplay={false}
            className="header__menu__icon"
          />
          <span className="link_underline">
            <ShinyText
              text="Menu"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </span>
        </div>

        {/* Dropdown Menu with mouse events */}
        <div
          className={`header__dropdown ${menuOpen ? "open" : ""}`}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <ul className="header__dropdown-list">
            <li className="header__dropdown-item">
              <Link to="/explore" className="header__dropdown-link">
                <span>Explore Products</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="header__search"
        onMouseEnter={handleSearchMouseEnter}
        onMouseLeave={handleSearchMouseLeave}
      >
        <input
          type="text"
          placeholder="Search..."
          className="header__search__input"
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          aria-label="Search"
        />
        <Lottie
          lottieRef={searchLottieRef}
          animationData={searchToX}
          loop={false}
          autoplay={false}
          className="header__search__icon"
        />
      </div>

      {/* Cart Button with animated counter */}
      <Link to="/cart" className="header__cart-link">
        <div
          className="header__cart"
          tabIndex={0}
          aria-label="Shopping cart"
          onMouseEnter={handleCartMouseEnter}
          onFocus={handleCartMouseEnter}
        >
          <Lottie
            lottieRef={cartLottieRef}
            animationData={cart}
            loop={false}
            autoplay={false}
            className="header__cart__icon"
          />
          {cartItems && cartItems.length > 0 && (
            <span
              className={`header__cart-count ${
                cartCountAnimating ? "animate" : ""
              }`}
            >
              {cartItems.length}
            </span>
          )}
        </div>
      </Link>

      {user ? (
        <div
          className="header__user-container"
          onMouseEnter={handleUserMouseEnter}
          onMouseLeave={handleUserMouseLeave}
        >
          <div
            className="header__profile header__profile-logged-in"
            tabIndex={0}
            aria-label="User menu"
            onMouseEnter={handleUserAvatarMouseEnter}
            onFocus={handleUserAvatarMouseEnter}
          >
            <div
              className="header__avatar"
              tabIndex={-1}
              aria-label="User avatar"
            >
              <Lottie
                lottieRef={userAvatarLottieRef}
                animationData={userAvatar}
                loop={false}
                autoplay={false}
                className="header__avatar__icon"
              />
            </div>
            <span className="header__username">
              {user.displayName || user.email.split("@")[0]}
            </span>
          </div>

          {/* User dropdown menu with mouse events */}
          <div
            className={`header__user-dropdown ${userMenuOpen ? "open" : ""}`}
            onMouseEnter={handleUserMouseEnter}
            onMouseLeave={handleUserMouseLeave}
          >
            <ul className="header__user-dropdown-list">
              <li className="header__user-dropdown-item">
                <Link to="/account" className="header__user-dropdown-link">
                  My Account
                </Link>
              </li>
              <li className="header__user-dropdown-item">
                <Link to="/orders" className="header__user-dropdown-link">
                  My Orders
                </Link>
              </li>
              <li className="header__user-dropdown-item">
                <button
                  onClick={handleSignOut}
                  className="header__user-dropdown-link header__sign-out"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link to="/auth/signin" className="header__auth-link">
          <div
            className="header__profile"
            tabIndex={0}
            aria-label="Sign in"
            onMouseEnter={handleUserMouseEnter}
            onMouseLeave={handleUserMouseLeave}
            onFocus={handleUserMouseEnter}
            onBlur={handleUserMouseLeave}
          >
            <Lottie
              lottieRef={userLottieRef}
              animationData={userPlus}
              loop={false}
              autoplay={false}
              className="header__menu__icon"
            />
            <span className="link_underline">
              <ShinyText
                text="Sign-in"
                disabled={false}
                speed={3}
                className="custom-class"
              />
            </span>
          </div>
        </Link>
      )}
    </nav>
  );
}

export default Header;

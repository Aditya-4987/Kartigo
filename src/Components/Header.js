import React, { useRef, useState } from "react";
import menuV4 from "../assets/icons/menuV4.json";
import userPlus from "../assets/icons/userPlus.json";
import searchToX from "../assets/icons/searchToX.json";
import "./Header.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import ShinyText from "../assets/ReactBits/TextAnimations-files/ShinyText/ShinyText";

function Header() {
  const menuLottieRef = useRef();
  const userLottieRef = useRef();
  const searchLottieRef = useRef();
  const [searchFocused, setSearchFocused] = useState(false);

  // Menu animation handlers
  const handleMenuMouseEnter = () => {
    menuLottieRef.current.setDirection(1);
    menuLottieRef.current.play();
  };
  const handleMenuMouseLeave = () => {
    menuLottieRef.current.setDirection(-1);
    menuLottieRef.current.play();
  };

  // User animation handlers
  const handleUserMouseEnter = () => {
    userLottieRef.current.setDirection(1);
    userLottieRef.current.play();
  };
  const handleUserMouseLeave = () => {
    userLottieRef.current.setDirection(-1);
    userLottieRef.current.play();
  };

  // Search icon logic
  const handleSearchMouseEnter = () => {
    if (!searchFocused) {
      searchLottieRef.current.setDirection(1);
      searchLottieRef.current.play();
    }
  };
  const handleSearchMouseLeave = () => {
    if (!searchFocused) {
      searchLottieRef.current.setDirection(-1);
      searchLottieRef.current.play();
    }
  };
  const handleSearchFocus = () => {
    setSearchFocused(true);
    searchLottieRef.current.setDirection(1);
    searchLottieRef.current.play();
  };
  const handleSearchBlur = () => {
    setSearchFocused(false);
    searchLottieRef.current.setDirection(-1);
    searchLottieRef.current.play();
  };

  return (
    <nav className="header" aria-label="Main navigation">
      <Link to="/" className="header__logo-link">
        <div className="header__logo" tabIndex={0} aria-label="Home">
          <h1>Kartigo</h1>
        </div>
      </Link>
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
      <Link to="/auth" className="header__auth-link">
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
    </nav>
  );
}

export default Header;

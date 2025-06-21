import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { StateProvider, useStateValue } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { NotificationProvider } from "./Components/NotificationSystem";
import Header from "./Components/Header";
import Explore from "./Components/Explore";
import AuthSignIn from "./Components/AuthSignIn";
import AuthSignUp from "./Components/AuthSignUp";
import PasswordReset from "./Components/PasswordReset";
import ProductDetails from "./Components/ProductDetails";
import { auth } from "./Components/firebase";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import { onAuthStateChanged } from "firebase/auth";

// This component uses useLocation hook inside Router context
function AppRoutes() {
  const location = useLocation();
  // Store the previous location before the modal was opened
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <Routes location={background || location}>
        <Route path="/auth/signin" element={<AuthSignIn />} />
        <Route path="/auth/signup" element={<AuthSignUp />} />
        <Route path="/auth/reset-password" element={<PasswordReset />} />
        <Route
          path="/explore"
          element={
            <>
              <Header />
              <Explore />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />
        <Route
          path="/product/:product_id"
          element={
            <>
              <Header />
              <ProductDetails isModal={false} />
            </>
          }
        />
      </Routes>

      {/* Show the modal when a background page is available */}
      {background && (
        <Routes>
          <Route
            path="/product/:product_id"
            element={<ProductDetails isModal={true} />}
          />
        </Routes>
      )}
    </div>
  );
}

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        dispatch({
          type: "SET_USER",
          user: {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || authUser.email.split("@")[0],
          },
        });
      } else {
        // User is signed out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <NotificationProvider>
        <Router>
          <div className="app">
            <AppRoutes />
          </div>
        </Router>
      </NotificationProvider>
    </StateProvider>
  );
}

export default App;

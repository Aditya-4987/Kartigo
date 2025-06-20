import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Explore from "./Components/Explore";
import AuthSignIn from "./Components/AuthSignIn";
import AuthSignUp from "./Components/AuthSignUp";
import PasswordReset from "./Components/PasswordReset";
import ProductDetails from "./Components/ProductDetails";
import { auth } from "./Components/firebase";
import { useStateValue } from "./StateProvider";
import { onAuthStateChanged } from "firebase/auth";

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
    <Router>
      <div className="App">
        <Routes>
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
              </>
            }
          />
          <Route
            path="/product/0001"
            element={
              <>
                <Header />
                <Explore />
                <ProductDetails />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

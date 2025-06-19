import "./App.css";
import AuthSignIn from "./Components/AuthSignIn";
import AuthSignUp from "./Components/AuthSignUp";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./Components/Explore";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
              </div>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <div>
                <AuthSignIn />
              </div>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <div>
                <AuthSignUp />
              </div>
            }
          />
          <Route
            path="/explore"
            element={
              <div>
                <Header />
                <Explore />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

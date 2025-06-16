import "./App.css";
import Auth from "./Components/Auth";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
            path="/auth"
            element={
              <div>
                <Auth />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

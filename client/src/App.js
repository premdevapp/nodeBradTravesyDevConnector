import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import setAuthToken from "./util/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import store from "./store";

// check for token
if (localStorage.jwtToken) {
  // set auth header
  setAuthToken(localStorage.jwtToken);
  // decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and authentication
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    // clear current profile
    // redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="landing">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

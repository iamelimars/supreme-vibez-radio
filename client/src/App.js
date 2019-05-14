import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import { Provider } from 'react-redux';
import store from './store'

// import Navbar from './components/layout/Navbar';
import Navbar from './components/navbar';
import Landing from './components/landing';
import AudioBar from './components/audio-bar/AudioBar';
import Terms from './components/terms/Terms'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import About from './components/about/About'
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ResetPassword from './components/reset-password/ResetPassword';
import ScrollToTop from './components/scroll-to-top/ScrollToTop'

// Check for token to keep user logged in
if (localStorage.jwtToken) {

  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F1592A',
    },
    secondary: red,
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className="App">
              <ScrollToTop>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgot_password" component={ForgotPassword} />
                <Route exact path="/reset_password" component={ResetPassword} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/about" component={About} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <AudioBar />
              </ScrollToTop>
            </div>
          </Router>
        </MuiThemeProvider>

      </Provider>
    );
  }
}

export default App;

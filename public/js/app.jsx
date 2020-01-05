import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "../js/components/Layout.jsx";
import Users from "../js/components/Users.jsx";
import Articles from "../js/components/Articles.jsx";
import Home from "../js/components/Home.jsx";
import TaxiDriver from "../js/components/TaxiDriver.jsx";
import UserLogin from "./components/LoginForms/UserLogin.jsx";
import DriverLogin from "./components/LoginForms/DriverLogin.jsx";
import DriverSignup from "./components/SignupForms/DriverSignup.jsx";
import UserSignup from "./components/SignupForms/UserSignup.jsx";
import LoginModal from "./components/includes/LoginModal.jsx";
import SignupModal from "./components/includes/SignupModal.jsx";

// import Navigation from './components/includes/Navigation.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange = () => {};
  render() {
    return (
      <Router>
        <Layout location={location} />
        <Switch>
          <Route exact path="/" component={LoginModal} />
          <Route path="/map" component={Home} />
          <Route path="/taximap" component={TaxiDriver} />
          <Route path="/users" component={Users} />
          <Route path="/signupmodal" component={SignupModal} />
          <Route path="/articles" component={Articles} />
          <Route path="/driverlogin" component={DriverLogin} />
          <Route path="/userlogin" component={UserLogin} />
          <Route path="/driversignup" component={DriverSignup} />
          <Route path="/usersignup" component={UserSignup} />
        </Switch>
      </Router>
    );
  }
}

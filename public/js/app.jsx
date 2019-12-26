import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "../js/components/Layout.jsx";
import Users from "../js/components/Users.jsx";
import Articles from "../js/components/Articles.jsx";
import Home from "../js/components/Home.jsx";
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
                    <Route exact path="/" component={Home} />
                    <Route path="/users" component={Users} />
                    <Route path="/articles" component={Articles} />
                </Switch>
            </Router>
        );
    }
}

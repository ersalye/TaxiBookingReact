import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

export default class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
  }
  toggleCollapse = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  };
  render() {
    console.log(this.props);
    const { location } = this.props;
    const { collapsed } = this.state;
    const homeClass = location.pathname === "/" ? "active" : "";
    const usersClass = location.pathname.match(/^\/users/) ? "active" : "";
    const articlesClass = location.pathname.match(/^\/articles/)
      ? "active"
      : "";
    const navClass = collapsed ? "collapse" : "";
    return (
      <div className="navbars navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">
              Taxi Booking App
            </a>
            <button
              className="navbar-toggle"
              type="button"
              onClick={this.toggleCollapse.bind(this)}
            >
              <span className="sr-only">Toggle Navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="navbar-main">
            <ul className="nav navbar-nav">
              <li className={homeClass}>
                <Link to="/" onClick={this.toggleCollapse}>
                  Home
                </Link>
              </li>
              <li className={usersClass}>
                <Link to="/users" onClick={this.toggleCollapse}>
                  Add Taxi Driver
                </Link>
              </li>
              <li className={articlesClass}>
                <Link to="/articles" onClick={this.toggleCollapse}>
                  Articles
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
Navigation.propTypes = {
  location: PropTypes.object
};

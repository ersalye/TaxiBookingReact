import React, { Component } from "react";

export default class LoginModal extends Component {
  loginUser = () => {
    this.props.history.push("userlogin");
  };
  loginDriver = () => {
    this.props.history.push("driverlogin");
  };
  signupBtn = () => {
    this.props.history.push("signupmodal");
  };
  render() {
    return (
      <form className="form-custom">
        <div className="form-group">
          <button
            onClick={this.loginUser}
            className="btn btn-primary btn-block"
          >
            Login as User
          </button>
        </div>
        <br />
        <div className="form-group">
          <button
            onClick={this.loginDriver}
            className="btn btn-danger btn-block"
          >
            Login as Taxi Driver
          </button>
        </div>
        <br />
        <a onClick={this.signupBtn} style={{ cursor: "pointer" }}>
          Signup{" "}
        </a>
      </form>
    );
  }
}

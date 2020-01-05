import React, { Component } from "react";

export default class SignupModal extends Component {
  signupUser = () => {
    this.props.history.push("/usersignup");
  };
  signupTaxi = () => {
    this.props.history.push("/driversignup");
  };
  render() {
    return (
      <form className="form-custom">
        <div className="form-group">
          <button
            onClick={this.signupUser}
            className="btn btn-primary btn-block"
          >
            SignUp as User
          </button>
        </div>
        <br />
        <div className="form-group">
          <button
            onClick={this.signupTaxi}
            className="btn btn-danger btn-block"
          >
            SignUp as Taxi Driver
          </button>
        </div>
        <br />
      </form>
    );
  }
}

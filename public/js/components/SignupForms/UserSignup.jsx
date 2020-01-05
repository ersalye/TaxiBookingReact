import React, { Component } from "react";
import axios from "axios";

export default class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneno: "",
      email: "",
      password: ""
    };
  }
  handleNameInput = e => {
    this.setState({ name: e.target.value });
  };
  handlePhoneNumberInput = e => {
    this.setState({ phoneno: e.target.value });
  };
  handleEmailInput = e => {
    this.setState({ email: e.target.value });
  };
  handlePasswordInput = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.API_URL}api/register`,
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        password: this.state.password,
        user_type: 1,
        name: this.state.name,
        phoneno: this.state.phoneno
      }
    })
      .then(response => {
        console.log(response, "response");
        if (response.data.success == true) {
          alert("You are Logged In");
        }
        this.props.history.push("/");
      })
      .catch(function(error) {
        if (error.response) {
          alert(error.response.data.message);
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.headers);
        }
      });
  };
  render() {
    return (
      <form className="form-custom" onSubmit={this.handleSubmit}>
        <h3>User Sign Up</h3>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={this.state.name}
            onChange={this.handleNameInput}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            value={this.state.phoneno}
            onChange={this.handlePhoneNumberInput}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email Address"
            value={this.state.email}
            onChange={this.handleEmailInput}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handlePasswordInput}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/userlogin">sign in?</a>
        </p>
      </form>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
export default class DriverLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleEmailInput = e => {
    this.setState({ email: e.target.value });
  };
  handlePasswordInput = e => {
    this.setState({ password: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    axios({
      method: "POST",
      url: `${process.env.API_URL}api/login`,
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        console.log(response, "response");
        if (response.data.success == true) {
          alert("You are Logged In");
        }
        this.props.history.push({
          pathname: "/taximap",
          state: {
            userid: response.data.userid,
            usertype: response.data.usertype
            // color: "green"
          }
        });
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
      <form className="form-custom">
        <h3>Driver Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
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
        <button
          type="submit"
          onClick={e => this.handleSubmit(e)}
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
      </form>
    );
  }
}

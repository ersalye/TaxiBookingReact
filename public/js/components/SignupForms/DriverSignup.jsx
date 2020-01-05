import React, { Component } from "react";
import axios from "axios";
import { red } from "@material-ui/core/colors";

export default class DriverSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneno: "",
      licensenumber: "",
      taxinumber: "",
      email: "",
      password: "",
      latitude: "",
      longitude: ""
    };
  }
  componentDidMount() {
    this.getPosition();
  }
  handleNameInput = e => {
    this.setState({ name: e.target.value });
  };
  handlePhoneNumberInput = e => {
    this.setState({ phoneno: e.target.value });
  };
  handleLicenseNumberInput = e => {
    this.setState({ licensenumber: e.target.value });
  };
  handleTaxiNumberInput = e => {
    this.setState({ taxinumber: e.target.value });
  };
  handleEmailInput = e => {
    this.setState({ email: e.target.value });
  };
  handlePasswordInput = e => {
    this.setState({ password: e.target.value });
  };
  getPosition() {
    navigator &&
      navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(location => {
        console.log(location, "location");
      });
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }

          // () => this.getLocations()
        );
        console.log(this.state.latitude);
        console.log(this.state.longitude);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }
  handleSubmit = event => {
    event.preventDefault();

    console.log(this.state.name);
    console.log(this.state.taxinumber);
    console.log(this.state.phoneno);
    console.log(this.state.licensenumber);
    console.log(this.state.email);
    console.log(this.state.password);
    axios({
      method: "POST",
      url: `${process.env.API_URL}api/driverregister`,
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        phoneno: this.state.phoneno,
        user_type:2,
        license_number: this.state.licensenumber,
        taxi_number: this.state.taxinumber,
        latitude: this.state.latitude,
        longitude: this.state.longitude
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
        <h3>Driver Sign Up</h3>

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
          <label>License Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="License Number"
            value={this.state.licensenumber}
            onChange={this.handleLicenseNumberInput}
          />
        </div>
        <div className="form-group">
          <label>Taxi Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Taxi Number"
            value={this.state.taxinumber}
            onChange={this.handleTaxiNumberInput}
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
        <h5 style={{ color: "blue" }}>
          (Turn On/Off Your Wifi If the Latitude Longitude is Not Coming in
          Decimals.)
        </h5>
        <div className="form-group">
          <label>Latitude:</label>
          <h5 style={{ color: "red" }}>{this.state.latitude}</h5>
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <h5 style={{ color: "red" }}>{this.state.longitude}</h5>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/driverlogin">sign in?</a>
        </p>
      </form>
    );
  }
}

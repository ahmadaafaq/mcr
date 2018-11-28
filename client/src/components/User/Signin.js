import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import "./Signin.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      password: ""
    };
  }
  //input field validation
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  //on change set state
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  //submit form data
  handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 200) {
        // set user info in localstorage
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("login", true);

        this.setState({ redirect: true });
      } else if (response.status === 401) {
        alert("Username password does not match.");
      }
    });
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect push to="/home" />;
    }
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            className="login-btn"
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <Link className="signup-text" to="/signup">
            Signup
          </Link>
        </form>
      </div>
    );
  }
}

export default Signin;

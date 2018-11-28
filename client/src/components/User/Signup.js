import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import Header from "../Layout/Header";
import "./Signup.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }
  //input fields validation
  validateForm() {
    return (
      this.state.username.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }
  //on change set state
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  //submit form data
  handleSubmit = async event => {
    event.preventDefault();
    fetch("http://localhost:8000/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 200) {
        this.setState({ redirect: true });
      }
    });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect push to="/home" />;
    }
    return (
      <React.Fragment>
        <Header />
        <div className="Signup">
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
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={this.state.email}
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
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                value={this.state.confirmPassword}
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
              Signup
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;

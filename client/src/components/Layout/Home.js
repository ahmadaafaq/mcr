import React, { Component } from "react";
import Header from "./Header";
import "./Home.css";
import { withRouter } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }
  componentDidMount() {
    const login = localStorage.getItem("login");
    if (!login) {
      this.props.history.push("/login");
    }
    const username = localStorage.getItem("username");
    this.setState({ username });
  }
  render() {
    return (
      <React.Fragment>
        <Header username={this.state.username} />
        <div className="home-text">
          <p>Welcome To McKinley&Rice</p>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);

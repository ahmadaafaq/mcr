import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isOpen: false
    };
  }
  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("login");
    this.props.history.push("/login");
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const login = localStorage.getItem("login");
    return (
      <React.Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/home">McKinley&Rice</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {login ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink href="#" onClick={this.logout}>
                      Logout
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="user" href="#">
                      Hello,{this.props.username}
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              ) : (
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default withRouter(Header);

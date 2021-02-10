import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const registerdUser = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/api/users/login", registerdUser)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        return this.setState({ errors: error.response.data });
      });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <section className="container">
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Sign into Your Account
          </p>
          <form className="form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email,
                })}
                type="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password,
                })}
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </section>
      </div>
    );
  }
}

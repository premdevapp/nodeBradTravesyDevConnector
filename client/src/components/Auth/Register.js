import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    axios
      .post("/api/users/register", newUser)
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
      <div className="register">
        <section className="container">
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
          </p>
          <form className="form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name,
                })}
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
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
              <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div className="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password,
                })}
                type="password"
                placeholder="Password"
                minLength="6"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password2,
                })}
                type="password"
                placeholder="Confirm Password"
                minLength="6"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </section>
      </div>
    );
  }
}

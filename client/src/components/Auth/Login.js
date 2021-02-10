import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    this.props.loginUser(registerdUser);
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);

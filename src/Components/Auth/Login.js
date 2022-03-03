import React, { Component } from "react";
import axios from "axios";
import * as Helper from "../Utility/Helper";
import { Route, withRouter } from "react-router-dom";
import { URL, USER_LOGIN } from "../../Axios/Api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.changeFormField = this.changeFormField.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  changeFormField(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  formSubmit(e) {
    e.preventDefault();
    let props = this.props;
    axios
      .post(URL + USER_LOGIN, {
        email: this.state.email,
        password: this.state.password,
      })
      .then(function (response) {
        console.log(response);

        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          Helper.alertMessage("success", "Login has been successfully!");
          //let history = useHistory();
          props.history.push("/dashboard");
          window.location.reload();
          //console.log(this.state.history)
          //this.state.history.push("/dashboard")
          // history.push("/dashboard");
        }
      });
    // .catch(function (error) {
    //   Helper.alertMessage("error", "Something went wrong!");
    //   console.log(error);
    // });
  }

  render() {
    return (
      <section className="login-block">
        {/* Container-fluid starts */}
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {/* Authentication card start */}
              <form
                className="md-float-material form-material"
                onSubmit={this.formSubmit}
              >
                <div className="text-center">
                  <img src="assets/images/logo.png" alt="logo.png" />
                </div>
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row m-b-20">
                      <div className="col-md-12">
                        <h3 className="text-center">Sign In</h3>
                      </div>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="email"
                        className="form-control form-input-bg"
                        id="tb-email"
                        placeholder="name@example.com"
                        required
                        name="email"
                        onChange={this.changeFormField}
                      />
                      <span className="form-bar" />
                      <label htmlFor="tb-email">Email</label>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="password"
                        className="form-control form-input-bg"
                        id="text-password"
                        placeholder="*****"
                        required
                        name="password"
                        onChange={this.changeFormField}
                      />
                      <span className="form-bar" />
                      <label htmlFor="text-password">Password</label>
                    </div>
                    <div className="row m-t-30">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src="assets/images/auth/Logo-small-bottom.png"
                          alt="small-logo.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {/* end of form */}
            </div>
            {/* end of col-sm-12 */}
          </div>
          {/* end of row */}
        </div>
        {/* end of container-fluid */}
      </section>
    );
  }
}

export default withRouter(Login);

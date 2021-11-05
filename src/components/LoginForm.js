import React, { Component } from "react";
import LoginService from "../services/LoginService";

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.loginHandler = this.loginHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    loginHandler = (event) => {
        event.preventDefault();
        let flag = false;

        if (!this.state.username.trim()) {
            flag = true
            document.getElementById("errorUsername").innerHTML = "Cannot be empty";
        } else {
            document.getElementById("errorUsername").innerHTML = "";
        }

        if (!this.state.password.trim()) {
            flag = true
            document.getElementById("errorPassword").innerHTML = "Cannot be empty";
        } else {
            document.getElementById("errorPassword").innerHTML = "";
        }

        if (!flag) {
            let user = {
                username: this.state.username,
                password: this.state.password,
            };

            LoginService.login(user).then((res) => {
                if (res.data.jwttoken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    this.props.history.push('/items');
                }
            }).catch(err => {
                if (err.response) {
                    document.getElementById("errorLogin").innerHTML = "Username or password are not valid";
                }
            })
        }
    }

    changeUsernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }

    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">User Login</h3>
                        <div className="card-body">
                            <form>
                                <span id="errorLogin" style={{ color: "red" }}></span>
                                <div className="form-group">
                                    <label>Username: </label>
                                    <input placeholder="user123" name="username" className="form-control" value={this.state.username}
                                        onChange={this.changeUsernameHandler} />
                                </div>
                                <span id="errorUsername" style={{ color: "red" }}></span>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input type="password" name="password" className="form-control" value={this.state.password}
                                        onChange={this.changePasswordHandler} />
                                </div>
                                <span id="errorPassword" style={{ color: "red" }}></span>
                                <button className="btn btn-success" onClick={this.loginHandler}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm
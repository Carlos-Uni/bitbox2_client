import React, { Component } from "react";
import LoginService from "../services/LoginService";
import LoginOrRegisterForm from "./LoginOrRegisterForm";


class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.actionHandler = this.actionHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    actionHandler = (event, path) => {
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
                    window.location.reload();
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
            <LoginOrRegisterForm changeUsernameHandler={this.changeUsernameHandler}
                changePasswordHandler={this.changePasswordHandler} actionHandler={this.actionHandler}
                username={this.state.username} password={this.state.password} />
        )
    }
}

export default LoginComponent
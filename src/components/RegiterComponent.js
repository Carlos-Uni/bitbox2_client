import React, { Component } from "react";
import LoginService from "../services/LoginService";
import LoginOrRegisterForm from "./LoginOrRegisterForm";


class RegisterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            successful: false,
        }

        this.actionHandler = this.actionHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    actionHandler = (event, path) => {
        event.preventDefault();
        let flag = false;

        this.setState({
            successful: false
        });

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

            const min = 1;
            const max = 9999;
            const rand = Math.floor(min + Math.random() * (max - min));

            let user = {
                userCode: rand,
                userName: this.state.username,
                password: this.state.password,
                role: 'USER'
            };

            LoginService.register(user).then((res) => {
                if (res.data.userCode) {
                    this.setState({
                        successful: true
                    });
                }
            }).catch(err => {
                if (err.response) {
                    document.getElementById("errorLogin").innerHTML = "Username already exist. Please choose other username";
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
            <div className="form-group">
                {this.state.successful ?
                    <div className="alert alert-success">
                        User Registered successfully
                    </div>
                    : ''
                }
                <LoginOrRegisterForm changeUsernameHandler={this.changeUsernameHandler}
                    changePasswordHandler={this.changePasswordHandler} actionHandler={this.actionHandler}
                    username={this.state.username} password={this.state.password} />
            </div>
        )
    }
}

export default RegisterComponent
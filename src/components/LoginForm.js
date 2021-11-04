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

        let user = {
            username: this.state.username,
            password: this.state.password,
        };

        console.log('item => ' + JSON.stringify(user));

        LoginService.login(user).then((res) => {
            console.log(res.data)
            if (res.data.jwttoken) {
              localStorage.setItem("user", JSON.stringify(res.data));
            }
          }).then(() => {
            this.props.history.push('/items');
          })
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
                                <div className="form-group">
                                    <label>Username: </label>
                                    <input placeholder="user123" name="username" className="form-control" value={this.state.username}
                                        onChange={this.changeUsernameHandler} />
                                </div>
                                <span className="well span6" id="errorUsername"></span>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input type="password" name="password" className="form-control" value={this.state.password}
                                        onChange={this.changePasswordHandler} />
                                </div>
                                <span className="well span6" id="errorPassword"></span>
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
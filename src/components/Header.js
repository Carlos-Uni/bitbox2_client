import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginService from "../services/LoginService";

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem("user")) {
            this.setState({
                currentUser: true,
            });
        } else {
            this.setState({
                currentUser: false,
            });
        }
    }

    logout() {
        LoginService.logout();
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="container-fluid">
                            <div className="navbar-brand">Store Management App</div>
                            {this.state.currentUser ? (
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <div className="navbar-brand">
                                            {JSON.parse(localStorage.getItem("user")).username}
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={this.logout}>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            Sign Up
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header

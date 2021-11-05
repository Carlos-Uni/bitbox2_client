import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginService from "../services/LoginService";

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {

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
                        <div style={{ color: "white" }}>Store Management App</div>
                        <Link to="/login">
                            {
                                localStorage.getItem("user") ? <button onClick={() => this.logout()} className="btn btn-info btn-md float-right">Log out</button>
                                    : ''
                            }
                        </Link>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header

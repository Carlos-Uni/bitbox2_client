import React, { Component } from "react";

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
                
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="https://github.com/Carlos-Uni/TFT_Project" className="navbar-brand">Store Management App</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header

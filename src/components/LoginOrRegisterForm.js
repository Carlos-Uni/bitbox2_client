import React from "react"


export default function LoginOrRegisterForm({ changeUsernameHandler, changePasswordHandler, actionHandler, username, password}) {
    return(
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        window.location.pathname === '/login' ||  
                        window.location.pathname === '/' ? 
                        <h3 className="text-center">User Login</h3> :
                        <h3 className="text-center">User Register</h3>
                    }
                    <div className="card-body">
                        <form>
                            <span id="errorLogin" style={{ color: "red" }}></span>
                            <div className="form-group">
                                <label>Username: </label>
                                <input placeholder="user123" name="username" className="form-control" value={username}
                                    onChange={changeUsernameHandler} />
                            </div>
                            <span id="errorUsername" style={{ color: "red" }}></span>
                            <div className="form-group">
                                <label>Password: </label>
                                <input type="password" name="password" className="form-control" value={password}
                                    onChange={changePasswordHandler} />
                            </div>
                            <span id="errorPassword" style={{ color: "red" }}></span>
                            <button className="btn btn-success" onClick={actionHandler}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
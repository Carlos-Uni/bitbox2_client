

export default function Login() {
    return (
        <div className="login-form">
            <form>
                <label>Usuario:</label>
                <input type="text" />
                <label>Contraseña:</label>
                <input type="text" />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}
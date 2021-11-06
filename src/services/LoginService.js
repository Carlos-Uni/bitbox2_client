import axios from "axios";

const LOGIN_URL = "http://localhost:8080/api/authenticate";
const REGISTER_URL = "http://localhost:8080/api/register";


class LoginService {
    login(user) {
        return axios.post(LOGIN_URL, user);
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(user) {
        return axios.post(REGISTER_URL, user);
    }
}

export default new LoginService()
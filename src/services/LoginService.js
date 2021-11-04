import axios from "axios";

const LOGIN__URL = "http://localhost:8080/api/authenticate";
const REGISTER_URL = "http://localhost:8080/api/register";


class LoginService {
    login(user) {
        return axios.post(LOGIN__URL, user);
    }
}

export default new LoginService()
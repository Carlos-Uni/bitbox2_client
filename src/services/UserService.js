import axios from "axios";
import AuthorizationHeaderService from "./AuthorizationHeaderService";


const USERNAME_SEARCH_URL = "http://localhost:8080/api/user/searchName";

class UserService {

    getUserByUserName(name){
        return axios.get(USERNAME_SEARCH_URL + '/' + name, AuthorizationHeaderService());
    }

}

export default new UserService()
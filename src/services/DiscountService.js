import axios from "axios";
import AuthorizationHeaderService from "./AuthorizationHeaderService";

const DISCOUNT_LIST__URL = "http://localhost:8080/api/discount/discountList";
const DISCOUNT_SEARCH_URL = "http://localhost:8080/api/discount/search";


class DiscountService {
    getDiscounts() {
        return axios.get(DISCOUNT_LIST__URL, AuthorizationHeaderService());
    }

    getDiscountByDiscountCode(discountCode){
        return axios.get(DISCOUNT_SEARCH_URL + '/' + discountCode, AuthorizationHeaderService());
    }

}

export default new DiscountService()
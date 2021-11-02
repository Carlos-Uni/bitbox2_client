import axios from "axios";

const DISCOUNT_LIST__URL = "http://localhost:8080/api/discount/discountList";
const DISCOUNT_SEARCH_URL = "http://localhost:8080/api/discount/search";


class DiscountService {
    getDiscounts() {
        return axios.get(DISCOUNT_LIST__URL);
    }

    getDiscountByDiscountCode(discountCode){
        return axios.get(DISCOUNT_SEARCH_URL + '/' + discountCode);
    }

}

export default new DiscountService()
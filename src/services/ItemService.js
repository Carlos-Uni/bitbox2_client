import axios from "axios";

const ITEM_LIST__URL = "http://localhost:8080/api/item/itemList";
const CREATE_ITEM_URL = "http://localhost:8080/api/item/create";

class ItemService {
    getItems() {
        return axios.get(ITEM_LIST__URL);
    }

    createItem(item){
        return axios.post(CREATE_ITEM_URL, item);
    }
}

export default new ItemService()
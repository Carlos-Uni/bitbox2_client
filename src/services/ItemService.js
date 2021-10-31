import axios from "axios";

const ITEM_LIST__URL = "http://localhost:8080/api/item/itemList";
const CREATE_ITEM_URL = "http://localhost:8080/api/item/create";
const ITEM_SEARCH_URL = "http://localhost:8080/api/item/search";
const UPDATE_ITEM_URL = "http://localhost:8080/api/item/update";


class ItemService {
    getItems() {
        return axios.get(ITEM_LIST__URL);
    }

    createItem(item){
        return axios.post(CREATE_ITEM_URL, item);
    }

    getItemByItemCode(itemCode){
        return axios.get(ITEM_SEARCH_URL + '/' + itemCode);
    }

    updateItem(item, itemCode){
        return axios.put(UPDATE_ITEM_URL + '/' + itemCode, item);
    }
}

export default new ItemService()
import axios from "axios";
import AuthorizationHeaderService from "./AuthorizationHeaderService";

const SUPPLIER_LIST__URL = "http://localhost:8080/api/supplier/supplierList";
const SUPPLIER_SEARCH_URL = "http://localhost:8080/api/supplier/search";

class SupplierService {
    getSuppliers() {
        return axios.get(SUPPLIER_LIST__URL, AuthorizationHeaderService());
    }

    getSupplierBySupplierCode(supplierCode){
        return axios.get(SUPPLIER_SEARCH_URL + '/' + supplierCode, AuthorizationHeaderService());
    }

}

export default new SupplierService()
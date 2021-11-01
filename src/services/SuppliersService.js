import axios from "axios";

const SUPPLIER_LIST__URL = "http://localhost:8080/api/supplier/supplierList";
const SUPPLIER_SEARCH_URL = "http://localhost:8080/api/supplier/search";


class SupplierService {
    getSuppliers() {
        return axios.get(SUPPLIER_LIST__URL);
    }

    getSupplierBySupplierCode(supplierCode){
        return axios.get(SUPPLIER_SEARCH_URL + '/' + supplierCode);
    }

}

export default new SupplierService()
import React, { Component } from "react";
import DiscountService from "../services/DiscountService";
import ItemService from "../services/ItemService";
import SuppliersService from "../services/SuppliersService";
import SupplierOrDiscountList from "./SupplierOrDiscountList";


class CreateItemForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            updateItemCode: this.props.match.params.itemCode,
            itemCode: '',
            price: '',
            description: '',
            state: '',
            suppliers: [],
            discounts: [],
            creationDate: '',
            discontinuedReason: '',
            supplierList: [],
            discountList: []
        }

        this.changeItemCodeHandler = this.changeItemCodeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeCreationDayHandler = this.changeCreationDayHandler.bind(this);
        this.createOrUpdateItem = this.createOrUpdateItem.bind(this);
        this.cancelItem = this.cancelItem.bind(this);
        this.handleSuppliers = this.handleSuppliers.bind(this);
        this.handleDiscounts = this.handleDiscounts.bind(this);
        this.cleanSupplierList = this.cleanSupplierList.bind(this);
        this.cleanDiscountList = this.cleanDiscountList.bind(this);
    }

    componentDidMount() {
        if (this.state.updateItemCode === 'add') {
            return;
        } else {
            ItemService.getItemByItemCode(this.state.updateItemCode).then((res) => {
                let item = res.data;
                this.setState({
                    itemCode: this.state.updateItemCode,
                    description: item.description,
                    price: item.price,
                    state: item.state,
                    suppliers: item.suppliers,
                    discounts: item.discounts,
                    creationDate: item.creationDate,
                    discontinuedReason: item.discontinuedReason
                });
            });

            SuppliersService.getSuppliers().then((res) => {
                this.setState({ supplierList: res.data });
            });

            DiscountService.getDiscounts().then((res) => {
                this.setState({ discountList: res.data });
            });
        }
    }

    changeItemCodeHandler = (event) => {
        this.setState({ itemCode: event.target.value });
    }

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    changePriceHandler = (event) => {
        this.setState({ price: event.target.value });
    }

    changeCreationDayHandler = (event) => {
        this.setState({ creationDate: event.target.value });
    }

    createOrUpdateItem = (event) => {
        event.preventDefault();
        let flag = false;

        if (this.state.updateItemCode === 'add') {

            if (!this.state.itemCode.trim()) {
                flag = true
                document.getElementById("errorItemCode").innerHTML = "Cannot be empty";
            } else {
                document.getElementById("errorItemCode").innerHTML = "";
            }
            if (!this.state.description.trim()) {
                flag = true
                document.getElementById("errorDescription").innerHTML = "Cannot be empty";
            } else {
                document.getElementById("errorDescription").innerHTML = "";
            }

            if (!flag) {
                const currentDate = new Date();
                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;

                if (day < 10 && month < 10) {
                    day = '0' + day;
                    month = '0' + month;
                } else if (day < 10) {
                    day = '0' + day;
                } else if (month < 10) {
                    month = '0' + month;
                }

                const date = `${currentDate.getFullYear()}-${day}-${month}`;
                let item = {
                    itemCode: this.state.itemCode,
                    description: this.state.description,
                    price: this.state.price,
                    creationDate: date,
                    state: 'ACTIVE'
                };
                console.log('item => ' + JSON.stringify(item));
                ItemService.createItem(item).then(res => {
                    this.props.history.push('/items');
                });
            }
        } else {
            let item = {
                itemCode: this.state.itemCode,
                description: this.state.description,
                price: this.state.price,
                state: this.state.state,
                suppliers: this.state.suppliers,
                discounts: this.state.discounts,
                creationDate: this.state.creationDate,
                discontinuedReason: this.state.discontinuedReason
            };
            console.log('item => ' + JSON.stringify(item));
            ItemService.updateItem(item, this.state.updateItemCode).then(res => {
                this.props.history.push('/items');
            });
        }
    }

    cancelItem() {
        this.props.history.push('/items');
    }

    changeTitle() {
        if (this.state.updateItemCode === 'add') {
            return <h3 className="text-center">Add Item</h3>
        } else {
            return <h3 className="text-center">Update Item</h3>
        }
    }

    handleSuppliers(event) {
        SuppliersService.getSupplierBySupplierCode(event.target.value).then((res) => {
            let supplier = res.data;
            if (this.state.suppliers.filter(e => e.supplierCode === supplier.supplierCode).length > 0) {
                return;
            } else {
                this.setState({
                    suppliers: [...this.state.suppliers, supplier]
                });
            }
        })

    }

    handleDiscounts(event) {
        DiscountService.getDiscountByDiscountCode(event.target.value).then((res) => {
            let discount = res.data;
            if (this.state.discounts.filter(e => e.discountCode === discount.discountCode).length > 0) {
                return;
            } else {
                this.setState({
                    discounts: [...this.state.discounts, discount]
                });
            }
        })
    }

    cleanSupplierList() {
        this.setState({
            suppliers: []
        });
    }

    cleanDiscountList() {
        this.setState({
            discounts: []
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {this.changeTitle()}
                        <div className="card-body">
                            <form>
                                {this.state.updateItemCode === 'add' ? <div className="form-group">
                                    <label>Item Code: </label>
                                    <input type="number" placeholder="Item Code" name="itemCode" className="form-control" value={this.state.itemCode}
                                        onChange={this.changeItemCodeHandler} required />
                                </div> : ""}
                                <span id="errorItemCode"style={{ color: "red" }}></span>
                                <div className="form-group">
                                    <label>Description: </label>
                                    <textarea placeholder="Description" name="description" className="form-control" value={this.state.description}
                                        onChange={this.changeDescriptionHandler} />
                                </div>
                                <span id="errorDescription" style={{ color: "red" }}></span>
                                <div className="form-group">
                                    <label>Price: </label>
                                    <input type="number" placeholder="Price" name="price" className="form-control" value={this.state.price}
                                        onChange={this.changePriceHandler} />
                                </div>
                                {this.state.updateItemCode === 'add' ? '' :
                                    <div className="form-group">
                                        <label>Creation Date: </label>
                                        <input type="date" name="creationDate" className="form-control" value={this.state.creationDate}
                                            onChange={this.changeCreationDayHandler} />
                                    </div>
                                }
                                {this.state.updateItemCode === 'add' ? '' :
                                    <div className="form-group">
                                        <label>Supplier: </label>
                                        <select name="supplier" onChange={this.handleSuppliers}>
                                            {
                                                this.state.supplierList.map(supplier =>
                                                    <optgroup label="Item suppliers">
                                                        <option value={supplier.supplierCode}>{supplier.name}</option>
                                                    </optgroup>
                                                )
                                            }
                                        </select>
                                    </div>
                                }
                                {this.state.updateItemCode === 'add' ? '' : <SupplierOrDiscountList title="Selected suppliers:" data={this.state.suppliers} cleanList={this.cleanSupplierList} />}
                                {this.state.updateItemCode === 'add' ? '' :
                                    <div className="form-group">
                                        <label>Discount: </label>
                                        <select name="discount" onChange={this.handleDiscounts}>
                                            {
                                                this.state.discountList.map(discount =>
                                                    <optgroup label="Item discount">
                                                        <option value={discount.discountCode}>{discount.reducedPrice}</option>
                                                    </optgroup>
                                                )
                                            }
                                        </select>
                                    </div>
                                }
                                {this.state.updateItemCode === 'add' ? '' : <SupplierOrDiscountList title="Selected discounts:" data={this.state.discounts} cleanList={this.cleanDiscountList} />}
                                <button className="btn btn-danger" onClick={this.cancelItem}>Cancel</button>
                                <button className="btn btn-success" onClick={this.createOrUpdateItem}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateItemForm
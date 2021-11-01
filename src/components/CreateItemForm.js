import React, { Component } from "react";
import ItemService from "../services/ItemService";
import SuppliersService from "../services/SuppliersService";

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
            itemSuppliers: [],
            selectedItemList: []
        }

        this.changeItemCodeHandler = this.changeItemCodeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.createOrUpdateItem = this.createOrUpdateItem.bind(this);
        this.cancelItem = this.cancelItem.bind(this);
        this.handleSuppliers = this.handleSuppliers.bind(this);
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
                this.setState({ itemSuppliers: res.data });
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

    createOrUpdateItem = (event) => {
        event.preventDefault();
        console.log(this.state.updateItemCode)
        if (this.state.updateItemCode === 'add') {
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
            return <h3 className="">Add Item</h3>
        } else {
            return <h3 className="">Update Item</h3>
        }
    }

    handleSuppliers(event) {
        SuppliersService.getSupplierBySupplierCode(event.target.value).then((res) => {
            let supplier = res.data;
            this.setState({ selectedItemList: supplier });
        })
    }

    render() {
        return (
            <div className="">
                <div className="">
                    <div className="">
                        {this.changeTitle()}
                        <div className="">
                            <form>
                                <div className="">
                                    <label>Item Code: </label>
                                    <input placeholder="Item Code" name="itemCode" className="" value={this.state.itemCode}
                                        onChange={this.changeItemCodeHandler} />
                                </div>
                                <div className="">
                                    <label>Description: </label>
                                    <textarea placeholder="Description" name="description" className="" value={this.state.description}
                                        onChange={this.changeDescriptionHandler} />
                                </div>
                                <div className="">
                                    <label>Price: </label>
                                    <input placeholder="Price" name="price" className="" value={this.state.price}
                                        onChange={this.changePriceHandler} />
                                </div>
                                <div className="">
                                    <label>Supplier: </label>
                                    <select name="supplier" onChange={this.handleSuppliers}>
                                        {
                                            this.state.itemSuppliers.map(supplier =>
                                                <optgroup label="Items suppliers">
                                                    <option value={supplier.supplierCode}>{supplier.name}</option>
                                                </optgroup>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="">
                                    <label>Suppliers selected: </label>
                                    
                                </div>
                                <button className="" onClick={this.cancelItem}>Cancel</button>
                                <button className="" onClick={this.createOrUpdateItem}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateItemForm
import React, { Component } from "react";
import ItemService from "../services/ItemService";

class UpdateItemForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            itemCode: this.props.match.params.itemCode,
            price: '',
            description: '',
            state: '',
            suppliers: [],
            discounts: [],
            creationDate: '',
            discontinuedReason: ''
        }

        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.createItem = this.updateItem.bind(this);
        this.cancelItem = this.cancelItem.bind(this);
    }

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    changePriceHandler = (event) => {
        this.setState({ price: event.target.value });
    }

    componentDidMount() {
        ItemService.getItemByItemCode(this.state.itemCode).then((res) => {
            let item = res.data;
            this.setState({
                description: item.description,
                price: item.price,
                state: item.state,
                suppliers: item.suppliers,
                discounts: item.discounts,
                creationDate: item.creationDate,
                discontinuedReason: item.discontinuedReason
            });
        });
    }

    updateItem = (event) => {
        event.preventDefault();
        let item = {
            itemCode: this.props.match.params.itemCode,
            description: this.state.description,
            price: this.state.price,
            state: this.state.state,
            suppliers: this.state.suppliers,
            discounts: this.state.discounts,
            creationDate: this.state.creationDate,
            discontinuedReason: this.state.discontinuedReason
        };
        console.log('item => ' + JSON.stringify(item));
        ItemService.updateItem(item, this.state.itemCode).then(res => {
            this.props.history.push('/items');
        });
    }

    cancelItem() {
        this.props.history.push('/items');
    }

    render() {
        return (
            <div className="">
                <div className="">
                    <div className="">
                        <h3 className="">Update Item</h3>
                        <div className="">
                            <form>
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
                                <button className="" onClick={this.cancelItem}>Cancel</button>
                                <button className="" onClick={this.updateItem}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateItemForm
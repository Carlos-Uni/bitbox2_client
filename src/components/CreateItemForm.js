import React, { Component } from "react";
import ItemService from "../services/ItemService";

class CreateItemForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            itemCode: '',
            price: '',
            description: ''
        }

        this.changeItemCodeHandler = this.changeItemCodeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.createItem = this.createItem.bind(this);
        this.cancelItem = this.cancelItem.bind(this);
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

    createItem = (event) => {
        event.preventDefault();
        const currentDate = new Date()
        const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
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

    cancelItem() {
        this.props.history.push('/items');
    }

    render() {
        return (
            <div className="">
                <div className="">
                    <div className="">
                        <h3 className="">Add Item</h3>
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
                                <button className="" onClick={this.cancelItem}>Cancel</button>
                                <button className="" onClick={this.createItem}>Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateItemForm
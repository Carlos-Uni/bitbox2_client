import React, { Component } from "react";
import ItemService from "../services/ItemService";

class DiscontinuedItemForm extends Component {
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

        this.changeReasonHandler = this.changeReasonHandler.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.cancelItem = this.cancelItem.bind(this);
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

    changeReasonHandler = (event) => {
        this.setState({ discontinuedReason: event.target.value });

    }

    updateItem = (event) => {
        event.preventDefault();
        let item = {
            itemCode: this.props.match.params.itemCode,
            description: this.state.description,
            price: this.state.price,
            state: 'DISCONTINUED',
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
                        <h3 className="">Discontinued Item</h3>
                        <div className="">
                            <form>
                                <div className="">
                                    <label>Specify a reason for the deactivation: </label>
                                    <textarea placeholder="The item is very old....." name="reason" className="" value={this.state.discontinuedReason}
                                        onChange={this.changeReasonHandler}/>
                                </div>
                                <button className="" onClick={this.cancelItem}>Cancel</button>
                                <button type="submit" onClick={this.updateItem}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DiscontinuedItemForm
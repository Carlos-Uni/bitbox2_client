import React, { Component } from "react";
import ItemService from "../services/ItemService";
import SupplierOrDiscountList from "./SupplierOrDiscountList";

class ItemDetails extends Component {
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
        this.cancelItem = this.cancelItem.bind(this);
    }

    componentDidMount() {
        ItemService.getItemByItemCode(this.state.itemCode).then((res) => {
            let item = res.data;
            this.setState({
                itemCode: item.itemCode,
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

    cancelItem() {
        this.props.history.push('/items');
    }

    render() {
        return (
            <div className="">
                <div className="">
                    <div className="">
                        <h3 className="">Item Details</h3>
                        <div className="">
                            <ul>
                                <li>
                                    Item Code: {this.state.itemCode}
                                </li>
                                <li>
                                    Description: {this.state.description}
                                </li>
                                <li>
                                    Price: {this.state.price}€
                                </li>
                                <li>
                                    Creation Date: {this.state.creationDate}
                                </li>
                                <li>
                                    State: {this.state.state}
                                </li>
                                {this.state.discontinuedReason ?
                                    <li>
                                        Discontinued Reason: {this.state.discontinuedReason}
                                    </li>
                                : ''}
                                {this.state.suppliers.length > 0 && <SupplierOrDiscountList title="Selected suppliers:" data={this.state.suppliers} />}
                                {this.state.discounts.length > 0 && <SupplierOrDiscountList title="Selected discounts:" data={this.state.discounts} />}
                                <button className="" onClick={this.cancelItem}>Back</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemDetails

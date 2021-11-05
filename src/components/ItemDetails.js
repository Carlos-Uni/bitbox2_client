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
            creator: '',
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
                creator: item.creator.userName,
                discontinuedReason: item.discontinuedReason
            });
        }).catch(err => {
            if (err.response) {
                this.props.history.push('/login');
            }
        });
    }

    cancelItem() {
        this.props.history.push('/items');
    }

    render() {
        return (
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">Item Details</h3>
                <div className="card-body">
                    <ul className="list-group">
                        <li className="list-group-item">
                            Item Code: {this.state.itemCode}
                        </li>
                        <li className="list-group-item">
                            Description: {this.state.description}
                        </li>
                        <li className="list-group-item">
                            Price: {this.state.price}€
                        </li>
                        <li className="list-group-item">
                            Creation Date: {this.state.creationDate}
                        </li>
                        <li className="list-group-item">
                            Creator: {this.state.creator}
                        </li>
                        <li className="list-group-item">
                            State: {this.state.state}
                        </li>
                        {this.state.discontinuedReason ?
                            <li className="list-group-item">
                                Discontinued Reason: {this.state.discontinuedReason}
                            </li>
                            : ''}
                        {this.state.suppliers.length > 0 && <SupplierOrDiscountList title="Selected suppliers:" data={this.state.suppliers} />}
                        {this.state.discounts.length > 0 && <SupplierOrDiscountList title="Selected discounts:" data={this.state.discounts} />}
                    </ul>
                    <button className="btn btn-secondary" onClick={this.cancelItem}>Back</button>
                </div>
            </div>
        )
    }
}

export default ItemDetails

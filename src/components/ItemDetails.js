import React, { Component } from "react";
import ItemService from "../services/ItemService";

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
                            <form>
                                <div className="">
                                    <label>Description: </label>
                                    <textarea placeholder="Description" name="description" className="" value={this.state.description}/>
                                </div>
                                <div className="">
                                    <label>Price: </label>
                                    <input placeholder="Price" name="price" className="" value={this.state.price} />

                                </div>
                                <div className="">
                                    <label>Creation Date: </label>
                                    <input placeholder="Creation Date" name="creationDate" className="" value={this.state.creationDate} />
                                </div>
                                <div className="">
                                    <label>State</label>
                                    <input placeholder="State" name="state" className="" value={this.state.state} />
                                </div>
                                <button className="" onClick={this.cancelItem}>Back</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemDetails

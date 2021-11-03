import React, { Component } from "react";
import ItemService from "../services/ItemService";

class ItemTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            showItem: 'ACTIVE'
        }

        this.viewItem = this.viewItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.radioButtonHandler = this.radioButtonHandler.bind(this);
    }

    componentDidMount() {
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data });
        });
    }

    viewItem(code) {
        this.props.history.push(`/itemDetails/${code}`);
    }

    addItem() {
        this.props.history.push('/add-item/add');
    }

    updateItem(code) {
        this.props.history.push(`/add-item/${code}`);
    }

    discontinuedItem(code) {
        this.props.history.push(`/discontinued-item/${code}`);
    }

    radioButtonHandler(event) {
        this.setState({
            showItem: event.target.value
        })
    }


    render() {
        return (
            <div>
                <h2 className="text-center">Items List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addItem}>Add Item</button>
                </div>
                <div className="row">
                    <h5>Show the items</h5>
                    <input type="radio" value="ACTIVE" selected={this.state.showItem} checked={this.state.showItem === "ACTIVE"} onChange={this.radioButtonHandler} />
                    <label>Active Item</label>
                    <input type="radio" value="DISCONTINUED" selected={this.state.showItem} checked={this.state.showItem === "DISCONTINUED"} onChange={this.radioButtonHandler} />
                    <label>Discontinued Item</label>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Creation Date</th>
                                <th>Item State</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(item =>
                                    item.state === this.state.showItem ?
                                        <tr key={item.itemCode}>
                                            <td>{item.itemCode}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>{item.creationDate}</td>
                                            <td>{item.state}</td>
                                            <td>
                                                <button onClick={() => this.viewItem(item.itemCode)} className="btn btn-info">Details</button>
                                                <button onClick={() => this.updateItem(item.itemCode)} className="btn btn-info">Update</button>
                                                {item.state === 'ACTIVE' ?
                                                    <button onClick={() => this.discontinuedItem(item.itemCode)} className="btn btn-danger">Discontinued</button>
                                                    : ''
                                                }
                                            </td>
                                        </tr>
                                        : ''
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}

export default ItemTable
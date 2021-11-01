import React, { Component } from "react";
import ItemService from "../services/ItemService";
import Modal from "./Modal";

class ItemTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
        }

        this.viewItem = this.viewItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    componentDidMount() {
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data });
        });
    }

    viewItem(code){
        this.props.history.push(`/itemDetails/${code}`);
    }

    addItem() {
        this.props.history.push('/add-item/add');
    }

    updateItem(code) {
        this.props.history.push(`/add-item/${code}`);
    }

    render() {
        return (
            <div>
                {/* <Modal show={this.state.show} items={this.state.itemDetails}/> */}
                <h2 className="">Items List</h2>
                <div className="">
                    <button className="" onClick={this.addItem}>Add Item</button>
                </div>
                <div className="">
                    <table className="">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Creation Date</th>
                                {/* <th>Creator</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(item =>
                                    <tr key={item.idItem}>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.creationDate}</td>
                                        {/* <td>{item.creator.userName}</td> */}
                                        <td>
                                            <button onClick={() => this.viewItem(item.itemCode)} className="">Details</button>
                                            <button onClick={() => this.updateItem(item.itemCode)} className="">Update</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                {this.state.show && <Modal show={this.state.show} items={this.state.itemDetails} />}
            </div >
        )
    }
}

export default ItemTable
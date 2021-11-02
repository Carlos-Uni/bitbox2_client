import React, { Component } from "react";
import ItemService from "../services/ItemService";
import Modal from "./Modal";

class ItemTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            show: false,
            updateItemCode: '',
            showItem: ''
        }

        this.viewItem = this.viewItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        // this.handleCheck = this.handleCheck.bind(this);
        // this.discontinuedItemHandler = this.discontinuedItemHandler(this);
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

    // handleCheck(event) {
    //     this.setState({
    //         show: !this.state.show
    //     });

    //     console.log(event.target.value)


    //     //ItemService.getItemByItemCode(event.target.value.itemCode)
    // };


    render() {
        return (
            <div>
                {/* <Modal show={this.state.show} items={this.state.itemDetails}/> */}
                <h2 className="">Items List</h2>
                <div className="">
                    <button className="" onClick={this.addItem}>Add Item</button>
                </div>
                <div className="">
                    <input type="radio" value="ACTIVE" />
                    <label for="html">Active Item</label>
                    <input type="radio" value="DISCONTINUED" />
                    <label for="css">Discontinued Item</label>
                </div>
                <div className="">
                    <table className="">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Creation Date</th>
                                {/* <th>Creator</th> */}
                                <th>Item State</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(item =>
                                    item.state === 'ACTIVE' ?
                                        <tr key={item.itemCode}>
                                            {/* <td>
                                            <input type="checkbox" onChange={this.handleCheck} value={item} 
                                            checked={item.state === 'ACTIVE'? true : false}/>
                                        </td> */}
                                            <td>{item.itemCode}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>{item.creationDate}</td>
                                            <td>{item.state}</td>
                                            {/* <td>{item.creator.userName}</td> */}
                                            <td>
                                                <button onClick={() => this.viewItem(item.itemCode)} className="">Details</button>
                                                <button onClick={() => this.updateItem(item.itemCode)} className="">Update</button>
                                                <button onClick={() => this.discontinuedItem(item.itemCode)} className="">Discontinued</button>
                                            </td>
                                        </tr>
                                        : ''
                                )
                            }
                        </tbody>
                    </table>
                </div>
                {/* <Modal show={this.state.show} handleCheck={this.handleCheck} discontinuedItemHandler={this.discontinuedItemHandler}/> */}
            </div >
        )
    }
}

export default ItemTable
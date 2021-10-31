import React, { Component } from "react";
import ItemService from "../services/ItemService";

class ItemTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
                items: []
        }

        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data});
        });
    }

    addItem(){
        this.props.history.push('/add-item');
    }

    render() {
        return (
            <div>
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
                                    </tr>
                                    )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

export default ItemTable
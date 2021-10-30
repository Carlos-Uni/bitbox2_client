import React, { Component, useState } from "react";
import ItemService from "../services/ItemService";

class ItemTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
                items: []
        }
    }

    componentDidMount() {
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="">Items List</h2>
                <div className="">
                    <table className="">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Creation Date</th>
                                <th>Creator</th>
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
                                        <td>{item.creator.userName}</td>
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
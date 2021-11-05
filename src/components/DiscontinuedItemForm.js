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
        }).catch(err => {
            if (err.response) {
                this.props.history.push('/login');
            }
        });
    }

    changeReasonHandler = (event) => {
        this.setState({ discontinuedReason: event.target.value });
    }

    updateItem = (event) => {
        event.preventDefault();
        let flag = false;


        if (this.state.discontinuedReason === null) {
            flag = true
            document.getElementById("errorDiscontinued").innerHTML = "Cannot be empty";
        } else {
            document.getElementById("errorDiscontinued").innerHTML = "";
        }

        if (!flag) {
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
    }

    cancelItem() {
        this.props.history.push('/items');
    }

    render() {
        return (
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">Discontinued Item</h3>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Specify a reason for the deactivation: </label>
                            <textarea placeholder="The item is very old....." name="reason" className="form-control" value={this.state.discontinuedReason}
                                onChange={this.changeReasonHandler} />
                        </div>
                        <span className="well span6" id="errorDiscontinued" style={{ color: "red" }}></span>
                        <div className="col px-2">
                            <button className="btn btn-danger" onClick={this.cancelItem}>Cancel</button>
                            <button className="btn btn-success" onClick={this.updateItem}>Save</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

export default DiscontinuedItemForm
import React, { useState } from "react";
import Modal from './Modal.js';


export default function ItemElement(props){

    const [modalState, setModalState] = useState(false);
    const [itemState, setItemState] = useState(props.item.estado==='Activo' ? true : false);

    function handleModal() {
        setModalState(!modalState);
    }

    function handleCheck() {
        setItemState(!itemState);
        
        console.log(props.item.estado);
        console.log(itemState);
    }

    return (
        <tr key={props.item.id}>
            <td>{props.item.nombre}</td>
            <td>{props.item.precio}</td>
            <td><input type="checkbox" checked={itemState} onChange={handleCheck}/></td>
            <Modal show={modalState} handleClose={handleModal} items={props.item}>
            </Modal>
            <button onClick={handleModal}>
                Open
            </button>
        </tr>
    );
}
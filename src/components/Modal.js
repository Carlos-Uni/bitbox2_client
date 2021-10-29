import '../css/modal.css'

const Modal = ({ show, handleClose, items }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <ul key={items.id}>
                    <li>Nombre: {items.nombre}</li>
                    <li>Precio: {items.precio}</li>
                    <li>Fecha: {items.fecha}</li>
                </ul>
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
};

export default Modal;
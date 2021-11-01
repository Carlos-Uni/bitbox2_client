import '../css/modal.css'

const Modal = ({ show, item }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    console.log(show)
    console.log(item)
    return (
        <div className={showHideClassName}>
            {/* <section className="modal-main">
                <ul key={item.itemCode}>
                    <li>Description: {item.description}</li>
                    <li>Price: {item.price}</li>
                    <li>Creation Date: {item.creationDate}</li>
                </ul>
                <button type="button">
                    Close
                </button>
            </section> */}
        </div>
    );
};

export default Modal;
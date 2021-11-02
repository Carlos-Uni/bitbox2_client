import '../css/modal.css'
import ItemService from '../services/ItemService';

const Modal = ({ show, item, handleCheck }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    console.log(item)

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="">
                    <label>Specify a reason for the deactivation: </label>
                    <textarea placeholder="The item is very old....." name="reason" className="" />
                </div>
                <button type="button" onClick={handleCheck}>Close</button>
                
            </section>
        </div>
    );
};

export default Modal;

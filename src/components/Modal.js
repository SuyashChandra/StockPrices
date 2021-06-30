import { useState } from "react";
import "./Modal.css"

const Modal = ({show, handleClose, handleSubmit}) => {
    const showModal= show ? "block": "none";
    const [price, setPrice] = useState(undefined)

    const handleModalSubmit = (e) => {
        e.preventDefault()
        handleSubmit(price)
    }

    return(
        <div style={{"display": showModal}} className="modal">
            <section className="modal-main" >
        <button type="button" onClick={handleClose} >
          Close
        </button>
        {/* <input type="number" placeholder="Add Stock Price" value={price} onChange={(e) => setPrice(e.target.value)} /> */}
        {setPrice(alert("enter"))}
        <button type="submit" onSubmit={handleModalSubmit}></button>
      </section>
        </div>
    )
}

export default Modal
import React,{useState} from "react";

const Content = (props) =>{
    let [price, setPrice] = React.useState(null)
    return(
        <div>

        {price ? <p style={{"position": "absolute", "top": "6rem", "left":"7.5rem", "width": "max-content", "fontSize": "2rem"}}>&#8377;{price}</p> : <button onClick ={e=> setPrice(10)}style={{"position": "absolute", "top": "6rem", "left":"7rem", "width": "max-content"}}>Add Stock Price</button>}
        </div>

    )
}

export default Content
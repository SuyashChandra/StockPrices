import React,{useCallback, useContext, useEffect, useState} from "react";
import { useSelector } from "react-redux";
// import Modal from "./Modal"
import {addPrice, deletePrice} from "./Airtable/apiRequest"
import UpdateContext from "./UpdateContext";
import Airtable from "airtable"

const Content = ({eventInfo, records}) =>{
    var base = new Airtable({apiKey: `${process.env.REACT_APP_API_KEY}`}).base('appfuXSS9or8DhGkN');
    let month = eventInfo.date.getMonth()
    let date= eventInfo.date.getDate();
    if(month<10){
        month= `0${eventInfo.date.getMonth()+1}`
    }
        date= parseInt(`${eventInfo.date.getDate()}`,10)
    if(date<=9){
        date=`0${date}`
    }

    let formatDate=`${eventInfo.date.getFullYear()}-${month}-${date}T18:30:00.000Z`
    let a;
    let id;
    let [price, setPrice] = React.useState(() => {
        if(records){
            records.map(record => {
                // console.log("Before :",record.Date,formatDate)
                if(formatDate === record.Date ){
                    // console.log(record.Price)
                    // console.log("After",formatDate, record.Date, record)
                    a= record.Price
                    
                    // setUpdate(true)
                }
            })
            return a
        }
        return undefined
    })
    let b;
    let [uniqueId, setUniqueId] = useState(() => {
        if(records){
            records.map(record => {
                // console.log("Before :",record.Date,formatDate)
                if(formatDate === record.Date ){
                    // console.log(record.Price)
                    // console.log("After",formatDate, record.Date, record)
                    b= record.id
                    
                    // setUpdate(true)
                }
            })
            return b
        }
        return undefined
    })

    // const as=useSelector(state=> console.log(state))
   
const [update, setUpdate]=useContext(UpdateContext)


    const getPrice = async (e)=> {
        let formatDate=`${eventInfo.date.getFullYear()}-${month}-${date}T18:30:00.000Z`
        let newPrice=prompt("Enter the stock price")
        if(newPrice!==null){

            // addPrice( formatDate,parseInt(newPrice, 10))
            base('Price Table').create([
                {
                  "fields": {
                    "Date": formatDate,
                    "Price": parseInt(newPrice, 10)
                  }
                }], function(err, records) {
                    if (err) {
                      console.error(err);
                      return;
                    }
                setUpdate(state => !state )
                });
            setPrice(parseInt(newPrice, 10))
                
        }
        
        console.log(eventInfo)
    }


   
    let [modal, setModal] = React.useState(false)
    

    // console.log(update)

    let eventDate = eventInfo.date.getDate()
    const onClickHandler = (e) =>{
        // console.log(eventInfo.dateClick)
        if(price!==null){
            setPrice(null)
        }
        if(uniqueId)
        setPrice(undefined)
        if(uniqueId ){
            base('Price Table').destroy([uniqueId], function(err, deletedRecords) {
                if (err) {
                    console.error(err);
                    return;
                }
                setUpdate(state => !state )
                console.log('Deleted', deletedRecords.length, 'records');
            });
        }
       

    }
    // console.log(process.env.REACT_APP_ID)

    let displayPrice = price ? <p style={{"width": "max-content", "alignSelf": "center", "fontSize":"3rem", "margin": 0, "position" :"relative", bottom:"1rem"}}>&#8377;{price}</p> : <button onClick ={getPrice} style={{"width": "max-content", "alignSelf": "center", "fontSize":"1rem"}} >Add Stock Price</button>

    

    // useEffect(
        
    //     updateData
    // )
    
    
   
    // const handleModalSubmit = (updatedPrice) => {
    //     setPrice(updatedPrice);
    //     setModal(false)
    // }
    return(
        <div style={{"display": "flex", "flexDirection":"column"}} key={Math.random()}>
    <button onClick={onClickHandler} style={{"width": "max-content", "alignSelf": "end", "fontSize": "1.2rem"}}  >X</button>
        <section  style={{"display": "flex","flexDirection":"column"}}>

      <header style={{"alignSelf": "center", "fontSize": "3rem", "paddingBottom": "2rem"}} >{eventDate}</header>
                    
                {displayPrice}
               

              
                
                
               </section>
      {/* <Modal  show={modal} handleClose={() => setModal(false)} handleSubmit={handleModalSubmit} /> */}
      </div>

    )
}

export default Content
import React, { useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import ParentContent from "./ParentContent"
import { fetchRecords } from './Airtable/apiRequest'
import PriceContext from "../App"
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../actions/postActions'
import axios from 'axios';
import  RecordContext from "./RecordContext"
import UpdateContext from './UpdateContext';
import "./Calendar.css"

export default function Calendar()  {
     
    // const dispatch=useDispatch()
    // useEffect(() => {
    //     dispatch(fetchPosts())
    // })
    // // let records = useContext(PriceContext);

    // const p =useSelector((state)=> console.log(state.postReducer.items))
    // console.log(p)

//     const URL = `https://api.airtable.com/v0/appfuXSS9or8DhGkN/Price%20Table?api_key=${process.env.REACT_APP_API_KEY}`

//     let [prices, setPrices] = useState()
//   useEffect(() => {
    

//       axios.get(URL)
//       .then(function(response){
//           // console.log(response)
//           setPrices(response)
//       })
//       .catch(function(error){
//           console.log(error)
//       })
    
   
//   },[])

const [update, setUpdate]=useContext(UpdateContext)



    return (
        <>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        // initialView="dayGridMonth"
        dayCellContent={RenderEventContent}
        className="full-calendar"
      />

      </>
    )
  }

function RenderEventContent(eventInfo) {
    // console.log(eventInfo)
    return (
        // <h6>h1</h6>
        <ParentContent  eventInfo={eventInfo} />
    )
  }
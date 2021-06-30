import axios from "axios"
import {  useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../actions/postActions"
import { fetchRecords } from "./Airtable/apiRequest"
import Content from "./Content"
import RecordContext from "./RecordContext"
import UpdateContext from "./UpdateContext"

const ParentContent = ({eventInfo}) => {
   
//   let arr=[]
// if(prices){
//     prices.data.records.map(record => (
//         arr.push(record.fields)
//         ))
// }    
const records=useContext(RecordContext)
// updateRecord({...records, isUpdating: true})
// console.log(records)
// const [update, setUpdate]=useContext(UpdateContext)

let arr=[]
if(records){

    records.data.records.map(record=>(
        arr.push({...record.fields, id:record["id"]})
        ))
    }
    return(
      <div style={{"width": "213px", "height": "180px", "position": "relative",  }}>

        <Content records={arr}  eventInfo={eventInfo} key={Math.random()} />
        </div>
    )
}

export default ParentContent
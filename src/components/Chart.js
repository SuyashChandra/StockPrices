import React, { useContext, useEffect, useState } from "react"
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import RecordContext from "./RecordContext";
import axios from "axios";
import UpdateContext from "./UpdateContext";

const Chart = () =>{

    const [update, setUpdate ]=useContext(UpdateContext)
    console.log(update)
const records=useContext(RecordContext)
let [prices, setPrices] = useState(undefined)
const URL = `https://api.airtable.com/v0/appfuXSS9or8DhGkN/Price%20Table?api_key=${process.env.REACT_APP_API_KEY}`

useEffect(() => {


  axios.get(URL)
  .then(function(response){
    //   console.log(response)
      setPrices( response)
      // console.log(prices)
  })
  .catch(function(error){
      console.log(error)
  })


},[update])
let arr=[]
if(prices){
    prices.data.records.map(record=>(
        arr.push({...record.fields})
        ))}
        const xAxis=[] 
        const yAxis=[] 
        // arr.map(rec => {
        //     return{
        //         Date: new Date(rec.Date),
        //         price:rec.price
        //     }
        // })
        const sortedRecords=arr.sort((a,b)=> new Date(a.Date)-new Date(b.Date))
        console.log(sortedRecords)
        arr.forEach(stock => {
            xAxis.push(stock.Date.split("T")[0])
            yAxis.push(stock.Price)
        })
        // console.log(yAxis)
    const options = {
        xAxis: {
            categories: xAxis,
            title:{
                text: "Date"
            }
        },
        yAxis:{
            title:{
                text: "Price in &#8377;"
            }
        },
        chart: {
            type: 'spline'
        },
        title: {
          text: "Stock Price Trend"
        },
        series: [
          {
            data: yAxis
          },
          
        ]
      };

    return(
        <div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </div>
    )
}


export default Chart
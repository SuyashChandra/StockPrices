import React, { useContext, useEffect, useState } from "react"
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import RecordContext from "./RecordContext";
import axios from "axios";
import UpdateContext from "./UpdateContext";
import ProfitContext from "./ProfitContext"

const Chart = ({Profit, MinIndex, MaxIndex}) =>{

    const [update, setUpdate ]=useContext(UpdateContext)
    // console.log(update)
// const records=useContext(RecordContext)
// const [profit, setProfit] = useContext(ProfitContext)
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
        let minIndex=0;
        let maxIndex=0;
        function maxProfit(prices, N)
        {
            let n = N;
            let cost = 0;
            let maxCost = 0;
         
            if (n == 0)
            {
                return 0;
            }
             
            // Store the first element of array
            // in a variable
            let min_price = prices[0];
         
            for(let i = 0; i < n; i++)
            {
                 
                // Now compare first element with all
                // the element of array and find the
                // minimum element
                if(min_price > prices[i]) minIndex=i
                min_price = Math.min(min_price, prices[i]);
         
                // Since min_price is smallest element of the
                // array so subtract with every element of the
                // array and return the maxCost
                cost = prices[i] - min_price;
                
                if(maxCost<cost) maxIndex=i
                maxCost = Math.max(maxCost, cost);
                // console.log("i", i,"min_price:", min_price, "prices[i]:", prices[i], "cost:",cost, "maxCost:",maxCost)
            }
            return maxCost;
        }
         
        const xAxis=[] 
        const yAxis=[] 
        // arr.map(rec => {
        //     return{
        //         Date: new Date(rec.Date),
        //         price:rec.price
        //     }
        // })
        const sortedPrices = arr.sort((a,b) => a.price-b.price)
        const length=sortedPrices.length
        // console.log(sortedPrices[sortedPrices.length-1]["Price"])
        let leastPrice, maxPrice;
        let buyDate, sellDate;
        // sortedPrices.forEach((arr,i) =>{
        //     if(i===0) {leastPrice =arr.Price; }
        //     if(i===length) maxPrice =arr.Price
        // })
        // maxProfit(maxPrice-leastPrice )
        const sortedRecords=arr.sort((a,b)=> new Date(a.Date)-new Date(b.Date))
        const Prices = sortedRecords.map(record=> record.Price)
        console.log(Prices)
        // BuySell(sortedRecords)
        // console.log(sortedRecords[minIndex], sortedRecords[maxIndex])
        
        
        
        
        
        arr.forEach(stock => {
            xAxis.push(stock.Date.split("T")[0])
            yAxis.push(stock.Price)
        })
        Profit(maxProfit(Prices,length))
        // console.log(xAxis[minIndex])
        MinIndex(xAxis[minIndex])
        MaxIndex(xAxis[maxIndex])
        // Profit( maxProfit(Prices,  length),xAxis[minIndex], xAxis[maxIndex] )
        // setProfit({profit:{maxProfit: Prices, buyDate: xAxis[minIndex], sellDate: xAxis[maxIndex]}})
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
import {  createContext, useEffect, useState } from 'react';
import './App.css';
import { fetchRecords } from './components/Airtable/apiRequest';
import Calendar from "./components/Calendar"
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./store"
import { fetchPosts } from './actions/postActions';
import axios from 'axios';
import RecordContext from "./components/RecordContext"
import UpdateContext from "./components/UpdateContext"
import Chart from "./components/Chart"
import ProfitContext from "./components/ProfitContext"


function App() {
    let [prices, setPrices] = useState(undefined)
    const URL = `https://api.airtable.com/v0/appfuXSS9or8DhGkN/Price%20Table?api_key=${process.env.REACT_APP_API_KEY}`
  
    useEffect(() => {
    

      axios.get(URL)
      .then(function(response){
          // console.log(response)
          setPrices( response)
          // console.log(prices)
      })
      .catch(function(error){
          console.log(error)
      })
    
   
  },[])

  let [update, setUpdate] = useState(false)
  // let [profit, setProfit] = useState({profit: {maxProfit: undefined, buyDate: undefined, sellDate: undefined}})
  let [profit, setProfit] = useState()
  const setMaxProfit = (maxProfit) =>{
    setProfit(maxProfit)
  }
  let [minIndex, setMinIndex] = useState()
  let [maxIndex, setMaxIndex] = useState()

  const MinIndex = (index) =>{
    setMinIndex(index)
  }
  const MaxIndex = (index) =>{
    setMaxIndex(index)
  }


  return (
    <RecordContext.Provider value={prices}>
      <UpdateContext.Provider value={[update, setUpdate]}>
      {/* <ProfitContext.Provider value={[profit, setProfit]}> */}

        <section className="App">

          <section className="calendar">
            <Calendar  />
          </section>
        <section className="right-panel">
          <section className="max-profit"><h1 style={{"fontSize": "3rem", "textAlign": "center"}}>Max Profit</h1><p style={{"fontSize":"2rem", "textAlign": "center"}}>&#8377;{profit}</p></section>
          <section className="chart">< Chart Profit={setMaxProfit} MinIndex={MinIndex} MaxIndex={MaxIndex} /></section>
          <section className="buy-sell"><section><h2>{minIndex}</h2> <h3>Buy Date</h3></section> <section><h2>{maxIndex}</h2><h3>Sell Date</h3></section></section>
        </section>
        </section>
      {/* </ProfitContext.Provider> */}
      </UpdateContext.Provider>
    </RecordContext.Provider>
    
  );
}

export default App;

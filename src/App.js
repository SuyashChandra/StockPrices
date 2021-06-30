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



function App() {
    let [prices, setPrices] = useState(undefined)
    const URL = `https://api.airtable.com/v0/appfuXSS9or8DhGkN/Price%20Table?api_key=${process.env.REACT_APP_API_KEY}`
  
    useEffect(() => {
    

      axios.get(URL)
      .then(function(response){
          console.log(response)
          setPrices( response)
          // console.log(prices)
      })
      .catch(function(error){
          console.log(error)
      })
    
   
  },[])

  let [update, setUpdate] = useState(false)

  return (
    <RecordContext.Provider value={prices}>
  <UpdateContext.Provider value={[update, setUpdate]}>
    
    <div className="App">
      <Calendar />
      {/* <Content /> */}
    </div>
  </UpdateContext.Provider>
    </RecordContext.Provider>
    
  );
}

export default App;

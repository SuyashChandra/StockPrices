import axios from "axios";
import { createContext, useEffect } from "react";
    const URL = `https://api.airtable.com/v0/appfuXSS9or8DhGkN/Price%20Table?api_key=${process.env.REACT_APP_API_KEY}`

let records


      axios.get(URL)
      .then(function(response){
          // console.log(response)
          records=response
      })
      .catch(function(error){
          console.log(error)
      })
    
   
const  RecordContext = createContext(records)
export default RecordContext
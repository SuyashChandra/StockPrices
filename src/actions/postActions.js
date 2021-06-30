import { FETCH_PRICES } from "./types";
import axios from "axios";

const URL = `https://api.airtable.com/v0/appfuXSS9or8DhGkN/Price%20Table?api_key=${process.env.REACT_APP_API_KEY}`

export function fetchPosts() {
    let records;
    axios.get(URL)
    .then(data => { records=data})
  return  {
          type: FETCH_PRICES,
          payload: records,
  };
}
import axios from 'axios'

const URL = `https://api.airtable.com/v0/appfuXSS9or8DhGkN/Price%20Table?api_key=${process.env.REACT_APP_API_KEY}`


const addPrice = (date,price ) =>{
    // const data={
    //     "records": [
    //         {
    //             "Date":date,
    //             "Price":price
    //         }
    //     ]
    // }
        axios.post(URL,{"records":[
           {
               "fields":{
                    "Date": date,
                    "Price": price
               }
           } 
           
        ] })
        .then(function(response){
            console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
   
    
}


const deletePrice =(id) =>{
    let unique =`records[]:[${id}]`
    console.log(typeof id, id)
    axios.delete(URL,`records[]= ${[`${id}`]}`)
    .then(function(response){
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
    })
}

const fetchRecords = () =>{
    axios.get(URL)
    .then(function(response){
        // console.log(response)
        return response
    })
    .catch(function(error){
        console.log(error)
    })
}

export {addPrice, fetchRecords, deletePrice};
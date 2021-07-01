import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import axios from "axios";
import RecordContext from "./components/RecordContext";
import UpdateContext from "./components/UpdateContext";
import Chart from "./components/Chart";

function App() {
  let [prices, setPrices] = useState(undefined);
  const URL = `https://api.airtable.com/v0/appfuXSS9or8DhGkN/Price%20Table?api_key=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    axios
      .get(URL)
      .then(function (response) {
        setPrices(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [URL]);

  let [update, setUpdate] = useState(false);
  let [profit, setProfit] = useState();
  const setMaxProfit = (maxProfit) => {
    setProfit(maxProfit);
  };
  let [minIndex, setMinIndex] = useState();
  let [maxIndex, setMaxIndex] = useState();

  const MinIndex = (index) => {
    setMinIndex(index);
  };
  const MaxIndex = (index) => {
    setMaxIndex(index);
  };

  return (
    <RecordContext.Provider value={prices}>
      <UpdateContext.Provider value={[update, setUpdate]}>
        <section className="App">
          <section className="calendar">
            <Calendar />
          </section>
          <section className="right-panel">
            <section className="max-profit">
              <h1 style={{ fontSize: "3rem", textAlign: "center" }}>
                Max Profit
              </h1>
              <p style={{ fontSize: "2rem", textAlign: "center" }}>
                &#8377;{profit}
              </p>
            </section>
            <section className="chart">
              <Chart
                Profit={setMaxProfit}
                MinIndex={MinIndex}
                MaxIndex={MaxIndex}
              />
            </section>
            <section className="buy-sell">
              <section>
                <h2>{minIndex}</h2> <h3>Buy Date</h3>
              </section>{" "}
              <section>
                <h2>{maxIndex}</h2>
                <h3>Sell Date</h3>
              </section>
            </section>
          </section>
        </section>
      </UpdateContext.Provider>
    </RecordContext.Provider>
  );
}

export default App;

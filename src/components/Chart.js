import React, { useContext, useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import UpdateContext from "./UpdateContext";

const Chart = ({ Profit, MinIndex, MaxIndex }) => {
  const [update] = useContext(UpdateContext);
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
  }, [update, URL]);
  let arr = [];
  if (prices) {
    prices.data.records.map((record) => arr.push({ ...record.fields }));
  }
  let minIndex = 0;
  let maxIndex = 0;
  function maxProfit(prices, N) {
    let n = N;
    let cost = 0;
    let maxCost = 0;

    if (n === 0) {
      return 0;
    }

    let min_price = prices[0];

    for (let i = 0; i < n; i++) {
      if (min_price > prices[i]) minIndex = i;
      min_price = Math.min(min_price, prices[i]);

      cost = prices[i] - min_price;

      if (maxCost < cost) maxIndex = i;
      maxCost = Math.max(maxCost, cost);
    }
    return maxCost;
  }

  const xAxis = [];
  const yAxis = [];

  const sortedPrices = arr.sort((a, b) => a.price - b.price);
  const length = sortedPrices.length;

  const sortedRecords = arr.sort((a, b) => new Date(a.Date) - new Date(b.Date));
  const Prices = sortedRecords.map((record) => record.Price);
  console.log(Prices);

  arr.forEach((stock) => {
    xAxis.push(stock.Date.split("T")[0]);
    yAxis.push(stock.Price);
  });
  Profit(maxProfit(Prices, length));
  MinIndex(xAxis[minIndex]);
  MaxIndex(xAxis[maxIndex]);
  const options = {
    xAxis: {
      categories: xAxis,
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Price in &#8377;",
      },
    },
    chart: {
      type: "spline",
    },
    title: {
      text: "Stock Price Trend",
    },
    series: [
      {
        data: yAxis,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;

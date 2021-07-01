import React, { useContext, useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import UpdateContext from "./UpdateContext";
import RecordContext from "./RecordContext";

const Chart = ({ Profit, MinIndex, MaxIndex }) => {
  const [update] = useContext(UpdateContext);
  const [, setPrices] = useContext(RecordContext);
  const [options, setOptions] = useState({
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  });
  const URL = `https://api.airtable.com/v0/appfuXSS9or8DhGkN/Price%20Table?api_key=${process.env.REACT_APP_API_KEY}`;
  function maxProfit(prices, N) {
    let n = N;
    let cost = 0;
    let maxCost = 0;
    let minIndex = 0;
    let maxIndex = 0;

    if (n === 0) {
      return 0;
    }

    let min_price = prices[0];

    for (let i = 0; i < n; i++) {
      min_price = Math.min(min_price, prices[i]);

      cost = prices[i] - min_price;

      if (maxCost <= cost) maxIndex = i;
      maxCost = Math.max(maxCost, cost);
      if (min_price >= prices[i]) {
        if (maxIndex >= i) minIndex = i;
      }
    }
    return { maxCost, minIndex, maxIndex };
  }

  function chartData(prices) {
    let arr = [];
    if (prices) {
      prices.data.records.map((record) => arr.push({ ...record.fields }));
    }

    const xAxis = [];
    const yAxis = [];

    const sortedPrices = arr.sort((a, b) => a.price - b.price);
    const length = sortedPrices.length;

    const sortedRecords = arr.sort(
      (a, b) => new Date(a.Date) - new Date(b.Date)
    );
    const Prices = sortedRecords.map((record) => record.Price);

    arr.forEach((stock) => {
      xAxis.push(stock.Date.split("T")[0]);
      yAxis.push(stock.Price);
    });

    const newOptions = {
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
        height: "302.5",
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
    return { Prices, length, xAxis, newOptions };
  }

  useEffect(() => {
    axios
      .get(URL)
      .then(function (response) {
        setPrices(response);
        let { Prices, length, xAxis, newOptions } = chartData(response);
        let { maxCost, minIndex, maxIndex } = maxProfit(Prices, length);
        Profit(maxCost);
        setOptions(newOptions);
        MinIndex(xAxis[minIndex]);
        MaxIndex(xAxis[maxIndex]);
      })
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, URL, setPrices]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;

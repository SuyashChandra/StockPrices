import React, { useContext, useState } from "react";
import UpdateContext from "./UpdateContext";
import Airtable from "airtable";

const Content = ({ eventInfo, records }) => {
  var base = new Airtable({ apiKey: `${process.env.REACT_APP_API_KEY}` }).base(
    "appfuXSS9or8DhGkN"
  );
  let month = eventInfo.date.getMonth();
  let date = eventInfo.date.getDate();
  if (month < 10) {
    month = `0${eventInfo.date.getMonth() + 1}`;
  }
  date = parseInt(`${eventInfo.date.getDate()}`, 10);
  if (date <= 9) {
    date = `0${date}`;
  }

  let formatDate = `${eventInfo.date.getFullYear()}-${month}-${date}T18:30:00.000Z`;
  let a;
  let [price, setPrice] = React.useState(() => {
    if (records) {
      records.forEach((record) => {
        if (formatDate === record.Date) {
          a = record.Price;
        }
      });
      return a;
    }
    return undefined;
  });
  let b;
  let [uniqueId] = useState(() => {
    if (records) {
      records.forEach((record) => {
        if (formatDate === record.Date) {
          b = record.id;
        }
      });
      return b;
    }
    return undefined;
  });

  const [, setUpdate] = useContext(UpdateContext);

  const getPrice = async (e) => {
    let formatDate = `${eventInfo.date.getFullYear()}-${month}-${date}T18:30:00.000Z`;
    let newPrice = prompt("Enter the stock price");
    if (newPrice !== null) {
      base("Price Table").create(
        [
          {
            fields: {
              Date: formatDate,
              Price: parseInt(newPrice, 10),
            },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          setUpdate((state) => !state);
        }
      );
      setPrice(parseInt(newPrice, 10));
    }

    console.log(eventInfo);
  };

  let eventDate = eventInfo.date.getDate();
  const onClickHandler = (e) => {
    if (price !== null) {
      setPrice(null);
    }
    if (uniqueId) setPrice(undefined);
    if (uniqueId) {
      base("Price Table").destroy([uniqueId], function (err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        setUpdate((state) => !state);
        console.log("Deleted", deletedRecords.length, "records");
      });
    }
  };

  let displayPrice = price ? (
    <p
      style={{
        width: "max-content",
        alignSelf: "center",
        fontSize: "3rem",
        margin: 0,
        position: "relative",
        bottom: "1rem",
      }}
    >
      &#8377;{price}
    </p>
  ) : (
    <button
      onClick={getPrice}
      style={{ width: "max-content", alignSelf: "center", fontSize: "1rem" }}
    >
      Add Stock Price
    </button>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      key={Math.random()}
    >
      <button
        onClick={onClickHandler}
        style={{ width: "max-content", alignSelf: "end", fontSize: "1.2rem" }}
      >
        X
      </button>
      <section style={{ display: "flex", flexDirection: "column" }}>
        <header
          style={{
            alignSelf: "center",
            fontSize: "3rem",
            paddingBottom: "2rem",
          }}
        >
          {eventDate}
        </header>

        {displayPrice}
      </section>
    </div>
  );
};

export default Content;

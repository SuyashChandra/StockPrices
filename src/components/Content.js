import React, { useContext, useState } from "react";
import UpdateContext from "./UpdateContext";
import Airtable from "airtable";
import "./Content.css";
import ReactModal from "react-modal";

const Content = ({ eventInfo, records }) => {
  var base = new Airtable({ apiKey: `${process.env.REACT_APP_API_KEY}` }).base(
    "appfuXSS9or8DhGkN"
  );

  const [modal, setModal] = useState(false);
  const [newPrice, setNewPrice] = useState("");

  let month = eventInfo.date.getMonth();
  let date = eventInfo.date.getDate();
  //   let stockCompleteDate = `${eventInfo.date.getFullYear()}-${month}-${date}`;
  // let stockDate= formatDate(stockCompleteDate, {
  //     month: 'long',
  //     year: 'numeric',
  //     day: 'numeric',
  //     timeZoneName: 'short',
  //     timeZone: 'UTC',
  //     locale: 'es'
  //   })

  const stockMonth = eventInfo.date.toLocaleString("default", {
    month: "long",
  });

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
    if (newPrice !== null) {
      setUpdate(true);
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
          setUpdate(false);
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
      setUpdate(true);
      base("Price Table").destroy([uniqueId], function (err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        setUpdate(false);
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
        color: "#118C4F",
      }}
    >
      &#8377;{price}
    </p>
  ) : (
    <button
      className="addPrice"
      //   onClick={getPrice}
      onClick={() => setModal(true)}
      style={{ alignSelf: "center" }}
    >
      Add Stock Price
    </button>
  );

  const closeButton = (
    <button
      type="submit"
      className="remove"
      onClick={onClickHandler}
      style={{ width: "max-content", alignSelf: "end", fontSize: "1.2rem" }}
    />
  );

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", zIndex: 1 }}
        key={Math.random()}
      >
        {price ? closeButton : null}
        <section
          style={{ display: "flex", flexDirection: "column", zIndex: 1 }}
        >
          <header
            style={{
              alignSelf: "center",
              fontSize: "2.5rem",
              paddingBottom: "2rem",
              zIndex: 1,
            }}
          >
            {eventDate}
          </header>

          {displayPrice}
        </section>
      </div>
      <ReactModal
        isOpen={modal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            zIndex: 1,
          },
          content: {
            position: "absolute",
            maxHeight: "15rem",
            fontFamily: "Open Sans",
            width: "22rem",
            top: "30%",
            left: "40%",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <h3>
          Enter the Stock Price for {date} {stockMonth}
        </h3>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={getPrice}
        >
          <button
            className="modalClose"
            style={{ position: "absolute", top: "4px", right: "3px" }}
            onClick={(e) => {
              e.preventDefault();
              setModal(false);
            }}
          >
            Close
          </button>
          <input
            type="number"
            placeholder="Enter the Stock price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            style={{ maxWidth: "15rem", marginBottom: "1rem" }}
          />
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        </form>
      </ReactModal>
    </>
  );
};

export default Content;

import { useContext } from "react";
import Content from "./Content";
import RecordContext from "./RecordContext";

const ParentContent = ({ eventInfo }) => {
  const records = useContext(RecordContext);

  let arr = [];
  if (records) {
    records.data.records.map((record) =>
      arr.push({ ...record.fields, id: record["id"] })
    );
  }
  return (
    <div style={{ width: "188px", height: "187px", position: "relative" }}>
      <Content records={arr} eventInfo={eventInfo} key={Math.random()} />
    </div>
  );
};

export default ParentContent;

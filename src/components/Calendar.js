import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import ParentContent from "./ParentContent";
import "./Calendar.css";

export default function Calendar() {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        dayCellContent={RenderEventContent}
        titleFormat={{ year: "numeric", month: "long", day: "2-digit" }}
        handleWindowResize={false}
      />
    </>
  );
}

function RenderEventContent(eventInfo) {
  return <ParentContent eventInfo={eventInfo} />;
}

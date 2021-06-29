import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Content from "./Content"

export default class Calendar extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        // initialView="dayGridMonth"
        dayCellContent={RenderEventContent}
      />
    )
  }
}
function RenderEventContent(eventInfo) {
   
    let date = eventInfo.date.getUTCDate()
    return (
      <div>
        <button>X</button>
        <section style={{"display": "flex", "position": "absolute", "right": "7rem", "justifyContent": "center", "alignContent": "center", "flexDirection": "column"}}>

      <header style={{"fontSize": "2rem", "textAlign": "center", "minWidth": "43px"}}>{date}</header>
        </section>
        <Content />
      </div>
    )
  }
import * as React from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";
const dontSelectTuesdays = (day) => {
    if (day.date.getDay() === 2) {
      return false;
    }
    return true;
  }
export default function Calendar({ setDate, date =null }) {

    const [basicJewishDay, setBasicJewishDay] = React.useState();

    return (
        <div style={{ width: "40%", display:"inline-block" }}>
            <ReactJewishDatePicker
                value={date? date: basicJewishDay}
                isHebrew
                canSelect={dontSelectTuesdays}
                onClick={
                    (day) => {
                    console.log("this is in Calendar" + day.jewishDateStrHebrew);
                    setDate(day.jewishDateStrHebrew)
                    setBasicJewishDay(day.date);
                }}
            /></div>
    );
}
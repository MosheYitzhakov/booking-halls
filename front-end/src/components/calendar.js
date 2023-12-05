import * as React from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";

export default function Calendar({ setDate, date =null }) {

    const [basicJewishDay, setBasicJewishDay] = React.useState(new Date());

    return (
        <div style={{ width: "40%" }}>
            <ReactJewishDatePicker
                value={date? date: basicJewishDay}
                isHebrew
                onClick={(day) => {
                    console.log("this is in Calendar" + day.jewishDateStrHebrew);
                    setDate(day.jewishDateStrHebrew)
                    setBasicJewishDay(day.date);
                }}
            /></div>
    );
}
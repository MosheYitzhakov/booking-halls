import React, { useContext, useEffect, useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import instance from '../API';
import "react-jewish-datepicker/dist/index.css";
import { TextField } from "@mui/material";
import { Dates } from "../hooks/useContext";

export default function Calendar({
 idHall = null,setDateOE =null }) {
    // const [dates, setDates] = useContext(Dates)
    const [basicJewishDay, setBasicJewishDay] = useState();
    const [eventsSchedule, seteventsSchedule] = useState();
    const [datee, setDatee] = useState();
    const [dates, setDates] = useContext(Dates);
    // console.log(date);
    useEffect(() => {
        async function name() {
            try {
                let url = `/dates`;
                if (typeof idHall === 'number') {
                    url += `/${idHall}`
                }
                const { data } = await instance.get(url);
                seteventsSchedule(data);
            } catch (error) {
                return error.message
            }
        }
        name()
    }, [idHall])
    const dontSelectTuesdays = (day) => {
        if (typeof idHall === 'number') {
            for (let i = 0; i < eventsSchedule?.length; i++) {
                if (day.jewishDateStrHebrew.replaceAll('״', '') === eventsSchedule[i].hebrew_date?.replaceAll('"', '')) {
                    return false;
                }
            }
        }
        if (day.date.getDay() === 6) {
            return false;
        }
        return true;
    }
console.log(dates);
    return (
        <div style={{ width: "40%", display: "inline-block", margin: 12 }}>
            <ReactJewishDatePicker
                value={dates.dateE ? dates.dateE : basicJewishDay}
                isHebrew

                canSelect={dontSelectTuesdays}
                onClick={
                    (day) => {
                        setDates( {dateE :day.date, dateH: day.jewishDateStrHebrew }
                          
                        )
                        // setDate(day.jewishDateStrHebrew)
                        // setBasicJewishDay(day.date);
                        // setDateE(day.date);
                        // console.log(new Date(day.date));
                        // console.log(day.jewishDateStr);
                        setDateOE &&  setDateOE(new Date(day.date).toLocaleDateString("he-IL"));
                    }}

            />
          
        </div>
    );
}
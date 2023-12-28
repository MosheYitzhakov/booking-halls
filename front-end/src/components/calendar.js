import React, { useContext, useEffect, useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import instance from '../API';
import "react-jewish-datepicker/dist/index.css";
// import { TextField } from "@mui/material";
import { Dates } from "../hooks/useContext";

export default function Calendar({
 idHall = null,setDateOE =null }) {
    // const [dates, setDates] = useContext(Dates)
    const [basicJewishDay, setBasicJewishDay] = useState();
    const [eventsSchedule, setEventsSchedule] = useState();
    const [jewishHolidays, setJewishHolidays] = useState();
    // const [datee, setDatee] = useState();
    const [dates, setDates] = useContext(Dates);
    
    //  https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&start=2021-12-29&ss=off&mf=on&end=2022-12-29    //  API חגים
    useEffect(() => {
        async function name() {
            try {
                let url = `/dates`;
                if (typeof idHall === 'number') {
                    url += `/${idHall}`
                }
                const { data } = await instance.get(url);
                setEventsSchedule(data);
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
    return (
        <div style={{ width: "40%", display: "inline-block", margin: 12 }}>
            <ReactJewishDatePicker
                value={dates.dateE ? dates.dateE : basicJewishDay}
                isHebrew
                canSelect={dontSelectTuesdays}
                onClick={
                    (day) => {
                        setDates( {dateE :day.date, dateH: day.jewishDateStrHebrew })
                        console.log(Number((new Date(day.date).toISOString().split('T')[0]).split("-")[0])+12);
                        setDateOE &&  setDateOE(new Date(day.date).toISOString().slice(0, 19).replace('T', ' '));
                    }}
            />
          
        </div>
    );
}
import React, { useContext, useEffect, useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import instance from '../API';
import "react-jewish-datepicker/dist/index.css";
import { Dates } from "../hooks/useContext";

export default function Calendar({ idHall = null, setDateOE = null }) {

    const [eventsSchedule, setEventsSchedule] = useState();
    const [dates, setDates] = useContext(Dates);
    const [holidays, setHolidays] = useState();

 
    useEffect(() => {
        async function name() {
            try {
                const urlH = ("https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&mf=on&start=2020-12-29&end=2022-12-29");
                const hoilds = await instance.get(urlH);
                setHolidays(hoilds.data)
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
        if (holidays?.items) {
            for (let i = 0; i < holidays?.items.length; i++) {
                if (day.jewishDateStr.replace("Tishri", "Tishrei").slice(0,-5) === holidays.items[i].hdate.slice(0,-5)) {
                    return false;
                }
                if (day.jewishDateStr.replace("AdarII", "Adar II").slice(0,-5) === holidays.items[i].hdate.slice(0,-5)) {
                    return false;
                }
                if (day.jewishDateStr.slice(0,-5) === holidays.items[i].hdate.slice(0,-5)) {
                    return false;
                }
            }
        }
        if (typeof idHall === 'number') {
            for (let i = 0; i < eventsSchedule?.length; i++) {
                if (day.jewishDateStrHebrew === eventsSchedule[i].hebrew_date) {
                    return false;
                }
            }
        }
        if (day.date.getDay() === 6) {
            return false;
        }
        return true;
    }
    // console.log(holidays?.items);

    return (
        <div style={{ width: "40%", display: "inline-block", margin: 12 }}>
            <ReactJewishDatePicker
                value={dates.dateE ? dates.dateE : new Date()}
                isHebrew
                canSelect={dontSelectTuesdays}
                onClick={
                    (day) => {
                        console.log(day.jewishDateStr.slice(0,-5));
                        setDates({ dateE: day.date, dateH: day.jewishDateStrHebrew })
                        setDateOE && setDateOE(new Date(day.date).toISOString().slice(0, 19).replace('T', ' '));
                    }}
            />
            {idHall && <p> תאריכים תפוסים לא נתנים לבחירה </p>}
        </div>
    );
}
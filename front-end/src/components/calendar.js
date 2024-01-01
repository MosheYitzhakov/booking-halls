import React, { useContext, useEffect, useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import instance from '../API';
import "react-jewish-datepicker/dist/index.css";
import { Dates } from "../hooks/useContext";

export default function Calendar({ idHall = null, setDateOE = null }) {

    const [eventsSchedule, setEventsSchedule] = useState();
    const [dates, setDates] = useContext(Dates);
    const [year, setYear] = useState(dates.dateE ? String(dates.dateE).split(' ')[3] : new Date().getFullYear())
    const [holidays, setHolidays] = useState();

    const getHolidays = async (newYear) => {
        const { data } = await instance.get("https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&ss=off&mf=on&start=" + newYear + "-01-01&end=" + (Number(newYear) + 1) + "-01-01");
        setHolidays(data)
    }
    useEffect(() => {
        async function name() {
            try {
                console.log(year);
                const urlH = ("https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&ss=off&mf=on&start=" + year + "-01-01&end=" + (Number(year) + 1) + "-01-01");
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
    }, [idHall, year])

    const dontSelectTuesdays = (day) => {

        if (holidays?.items) {
            for (let i = 0; i < holidays?.items.length; i++) {
                if (day.jewishDateStr.replace("Tishri", "Tishrei") === holidays.items[i].hdate) {
                    return false;
                }
                if (day.jewishDateStr.replace("AdarII", "Adar II") === holidays.items[i].hdate) {
                    return false;
                }
                if (day.jewishDateStr === holidays.items[i].hdate) {
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
                        // console.log(day.jewishDateStr);
                        setDates({ dateE: day.date, dateH: day.jewishDateStrHebrew })
                        const yearDate = (String(day.date).split(' ')[3]);
                        if (Number(year) !== Number(yearDate)) {
                            getHolidays(Number(yearDate))
                            setYear(Number(yearDate))
                        }
                        setDateOE && setDateOE(new Date(day.date).toISOString().slice(0, 19).replace('T', ' '));
                    }}
            />
            {idHall && <p> תאריכים תפוסים לא נתנים לבחירה </p>}
        </div>
    );
}
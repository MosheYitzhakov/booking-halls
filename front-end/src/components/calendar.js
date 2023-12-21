import React, { useEffect, useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import instance from '../API';
import "react-jewish-datepicker/dist/index.css";

export default function Calendar({ setDate, dateE = null, setDateE, idHall = null }) {
    const [basicJewishDay, setBasicJewishDay] = useState();
    const [eventsSchedule, seteventsSchedule] = useState();
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

    return (
        <div style={{ width: "40%", display: "inline-block" }}>
            <ReactJewishDatePicker
                value={dateE ? dateE : basicJewishDay}
                isHebrew
                canSelect={dontSelectTuesdays}
                onClick={
                    (day) => {
                        setDate(day.jewishDateStrHebrew)
                        setBasicJewishDay(day.date);
                        setDateE(day.date);
                    }}
            /></div>
    );
}
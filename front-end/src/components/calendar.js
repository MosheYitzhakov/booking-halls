import React, { useEffect, useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import instance from '../API';
import "react-jewish-datepicker/dist/index.css";

export default function Calendar({ setDate, date = null }) {
    const [basicJewishDay, setBasicJewishDay] = useState();
    const [eventsSchedule, seteventsSchedule] = useState();
    useEffect(() => {
        async function name() {
            try {
                const { data } = await instance.get(`/dates`);
                seteventsSchedule(data);
            } catch (error) {
                return error.message
            }
        }
        name()
    }, [])
    const dontSelectTuesdays = (day) => {
        // for (let i = 0; i < eventsSchedule?.length; i++) {
        //     if (day.jewishDateStrHebrew.replaceAll('״', '') === eventsSchedule[i].hebrew_date.replaceAll('"', '')) {
        //         return false;
        //     }
        // }
        if (day.date.getDay() === 6) {
            return false;
        }
        return true;
    }

    return (
        <div style={{ width: "40%", display: "inline-block" }}>
            <ReactJewishDatePicker
                value={!date ? new Date() : basicJewishDay}
                isHebrew
                canSelect={dontSelectTuesdays}
                onClick={
                    (day) => {
                        setDate(day.jewishDateStrHebrew)
                        setBasicJewishDay(day.date);
                    }}
            /></div>
    );
}
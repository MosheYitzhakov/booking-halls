import React, { useEffect, useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import instance from '../API';
import "react-jewish-datepicker/dist/index.css";
import { TextField } from "@mui/material";

export default function Calendar({date, setDate, dateE = null, setDateE, idHall = null }) {
    const [basicJewishDay, setBasicJewishDay] = useState();
    const [eventsSchedule, seteventsSchedule] = useState();
    const [datee, setDatee] = useState();
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
        <div style={{ width: "40%", display: "inline-block", margin: 12 }}>
            <ReactJewishDatePicker
                value={dateE ? dateE : basicJewishDay}
                isHebrew
                canSelect={dontSelectTuesdays}
                onClick={
                    (day) => {
                        setDate(day.jewishDateStrHebrew)
                        setBasicJewishDay(day.date);
                        setDateE(day.date);
                        console.log(new Date(day.date));
                        console.log(day.jewishDateStr);
                        setDatee(new Date(day.date).toLocaleDateString("he-IL"));
                    }}

            />
            <TextField
                variant="standard"
                value={datee + " "+ basicJewishDay}
                InputProps={{
                    readOnly: true,
                }}
                name='dateD'>
            </TextField>
        </div>
    );
}
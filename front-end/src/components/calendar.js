import React, { useContext, useEffect, useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import instance from "../API";
import "react-jewish-datepicker/dist/index.css";
import { ClientSideContext } from "../hooks/useContext";
import { formatDate } from "../functions/date";

const urlCalenderHebrew =
  "https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&mf=on&start=2020-12-29&end=2022-12-29";
export default function Calendar({ idHall = null }) {
  const {
    dateEvent: [dateEvent, setDateEvent],
  } = useContext(ClientSideContext);
  const [eventsSchedule, setEventsSchedule] = useState([]);
  const [holidays, setHolidays] = useState({ items: [] });
  console.log({ dateEvent });

  useEffect(() => {
    async function BlockingBusyDates() {
      try {
        const { data: calenderHebrew } = await instance.get(urlCalenderHebrew);
        setHolidays(calenderHebrew);
        const { data } = await instance.get(
          `/dates${dateEvent.id_hall && `/${dateEvent.id_hall}`}`
        );
        setEventsSchedule(data || []);
      } catch (error) {
        console.error(error.message);
      }
    }
    BlockingBusyDates();
  }, [dateEvent.id_hall]);

  const dontSelectTuesdays = (day) => {
    if (holidays?.items && holidays.items.length > 0) {
      for (let i = 0; i < holidays.items.length; i++) {
        const holidayDate = holidays.items[i].hdate.slice(0, -5);
        const dayJewishStr = day.jewishDateStr
          .replace("Tishri", "Tishrei")
          .slice(0, -5);
        const dayAdarStr = day.jewishDateStr
          .replace("AdarII", "Adar II")
          .slice(0, -5);

        if (dayJewishStr === holidayDate || dayAdarStr === holidayDate) {
          return false;
        }
      }
    }

    if (dateEvent.id_hall && eventsSchedule?.length > 0) {
      for (let i = 0; i < eventsSchedule.length; i++) {
        if (day.jewishDateStrHebrew === eventsSchedule[i].hebrew_date) {
          return false;
        }
      }
    }

    if (day.date.getDay() === 6) {
      return false;
    }

    return true;
  };

  return (
    <div style={{ width: "40%", display: "inline-block", margin: 12 }}>
      <ReactJewishDatePicker
        value={dateEvent?.date ? new Date(dateEvent.date) : new Date()} // לוודא שהערך לא undefined
        isHebrew
        canSelect={dontSelectTuesdays}
        onClick={(day) => {
          setDateEvent((prev) => ({
            ...prev,
            date: formatDate(day.date),
            hebrew_date: day.jewishDateStrHebrew,
          }));
        }}
      />
    </div>
  );
}

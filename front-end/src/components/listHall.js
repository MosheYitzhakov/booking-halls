import React, { useContext, useEffect, useState } from "react";
import Hall from "./oneHall";
import instance from "../API";
import { ClientSideContext } from "../hooks/useContext";

export default function HallForList({ halls }) {
  const [hallByDate, setHallByDate] = useState(halls);
  const {
    dateEvent: [dateEvent],
  } = useContext(ClientSideContext);

  useEffect(() => {
    async function name() {
      try {
        if (dateEvent.hebrew_date) {
          const { data: hallsAvailable } = await instance.get(
            `/hallsForDate/${dateEvent.hebrew_date}`
          );
          if (typeof data !== "string") setHallByDate(hallsAvailable);
        }
      } catch (error) {
        return error.message;
      }
    }
    name();
  }, [dateEvent]);
  return (
    <div>
      {hallByDate?.map((hall, i) => {
        return <Hall key={i} hall={hall} />;
      })}
    </div>
  );
}

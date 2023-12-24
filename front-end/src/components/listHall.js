
import React, { useContext, useEffect, useState } from 'react';
import Hall from './oneHall';
import instance from '../API';
import { Dates } from '../hooks/useContext';

export default function HallForList({ halls }) {
  const [hallByDate, setHallByDate] = useState(halls)
  const [dates, setDates] = useContext(Dates);
 
  useEffect(() => {
    async function name() {
      console.log(dates.dateH);
      try {
        const { data } = await instance.get(`/hallsForDate/${dates.dateH.replaceAll('״', '"')}`);
        if(typeof data !== "string")
        setHallByDate(data);
      } catch (error) {
        return error.message
      }
    } 
    // if(dates)
     name()

  },[dates])
  console.log(hallByDate);
  return (
    <div>
      {
        hallByDate?.map((hall, i) => {
          return <Hall key={i} hall={hall} />
        })}

    </div>);

}



import React, { useContext, useEffect, useState } from 'react';
import Hall from './oneHall';
import instance from '../API';
import { Dates } from '../hooks/useContext';

export default function HallForList({ halls }) {
  const [hallByDate, setHallByDate] = useState(halls)
  const [dates, setDates] = useContext(Dates);
 
  useEffect(() => {
    async function name() {
      try {
        if(dates?.dateH){
        const { data } = await instance.get(`/hallsForDate/${dates.dateH}`);
        if(typeof data !== "string")
        setHallByDate(data);
      }
      } catch (error) {
        return error.message
      }
    } 
    // if(dates)
     name()

  },[dates])
  return (
    <div>
      {
        hallByDate?.map((hall, i) => {
          return <Hall key={i} hall={hall} />
        })}

    </div>);

}



import React, { useEffect, useState } from 'react';
import Hall from './oneHall';
import instance from '../API';

export default function HallForList({ halls, dateE,date }) {
  const [hallByDate, setHallByDate] = useState()

  useEffect(() => {
    async function name() {
      try {
        const { data } = await instance.get(`/hallsForDate/${date.replaceAll('״', '"')}`);
        setHallByDate(data);
      } catch (error) {
        return error.message
      }
    }
     name()
  },[date])
  const mapData = (!hallByDate || !date) ?halls  : hallByDate;

  return (
    <div>
      {
        mapData.map((hall, i) => {
          return <Hall key={i} hall={hall} dateE={dateE}/>
        })}

    </div>);

}


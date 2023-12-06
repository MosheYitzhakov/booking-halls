// import Header from "../../components/header"
import React, { useState } from 'react';
import HallForList from "../../components/listHall";
import Calendar from '../../components/calendar';
import { SelectionButton } from '../../components/selectionButton';


export const Home = () => {
    const [halls, setHalls] = useState()
    const [date, setDate] = useState()
    console.log("this is in home " + date);
    return (
        <>
           
                <SelectionButton/>
                <Calendar setDate={setDate}/>
          
            <div>
             {/* { halls &&   */}
             <> <HallForList date={date} hall={halls}/>
                <HallForList hall={halls}/></>
                {/*  }  */}
            </div>

        </>
    )
}
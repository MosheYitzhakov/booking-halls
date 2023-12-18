// import Header from "../../components/header"
import React, { useEffect, useState } from 'react';
import HallForList from "../../components/listHall";
import Calendar from '../../components/calendar';
import { SelectionButton } from '../../components/selectionButton';
import instance from '../../API';

export const Home = () => {
    
    const [halls, setHalls] = useState()
    const [date, setDate] = useState()
    console.log("this is in home " + date);
    useEffect(() => {
        async function name() {
            try {
                const { data } = await instance.get(`/`);
                setHalls(data)
            } catch (error) {
                return error.message
            }
        }
        name()
    }, [])
    return (
        <>
           
                <SelectionButton/>
                <Calendar setDate={setDate}/>
          
            <div>
             { halls &&  
             <> <HallForList date={date} hall={halls}/>
                <HallForList hall={halls}/>
                <HallForList hall={halls}/>
                <HallForList hall={halls}/>
                
                </>
                 } 
            </div>

        </>
    )
}
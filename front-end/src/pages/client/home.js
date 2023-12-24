// import Header from "../../components/header"
import React, { useContext, useEffect, useState } from 'react';
import HallForList from "../../components/listHall";
import Calendar from '../../components/calendar';
import { SelectionButton } from '../../components/selectionButton';
import instance from '../../API';
import { UseEffect } from '../../hooks/useEffect';
import { Dates } from '../../hooks/useContext';

export const Home = () => {
const dates= useContext(Dates)
    const [halls, setHalls] = useState()
    const [date, setDate] = useState()
    const [dateE, setDateE] = useState()

    // const getHalls = UseEffect('/')
    // console.log(getHalls);
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
    const nameHalls = halls?.map(({ name_hall }) => {
        return { label: name_hall }
    })
    return (
        <>

            <SelectionButton names={nameHalls ? nameHalls : ""} 
            setDateE={setDateE}
            />
            <Calendar 
            // setDate={setDate} 
            // dateE={dateE} setDateE={setDateE}
            />
            <div>
                {halls && <HallForList halls={halls} dateE={dateE}
                 date={date}
                 />

                }
            </div>

        </>
    )
}
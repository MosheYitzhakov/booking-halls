// import Header from "../../components/header"
import React, { useEffect, useState } from 'react';
import HallForList from "../../components/listHall";
import Calendar from '../../components/calendar';
import { SelectionButton } from '../../components/selectionButton';
import instance from '../../API';

export const Home = () => {

    const [halls, setHalls] = useState()
    const [date, setDate] = useState()
    const [dateE, setDateE] = useState()
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

            <SelectionButton names={nameHalls ? nameHalls : ""} setDate={setDate}/>
            <Calendar setDate={setDate} dateE={dateE} setDateE={setDateE} />
            <div>
                {halls && <HallForList halls={halls} dateE={dateE} date={date}/>

                }
            </div>

        </>
    )
}
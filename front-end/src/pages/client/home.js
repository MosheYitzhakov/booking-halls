// import Header from "../../components/header"
import React, { useContext, useEffect, useState } from 'react';
import HallForList from "../../components/listHall";
import Calendar from '../../components/calendar';
import { SelectionButton } from '../../components/selectionButton';
import instance from '../../API';
import { UseEffect } from '../../hooks/useEffect';

export const Home = () => {
    const [halls, setHalls] = useState()
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
            />
            <Calendar />
            <div>
                {halls && <HallForList halls={halls} />}
            </div>

        </>
    )
}
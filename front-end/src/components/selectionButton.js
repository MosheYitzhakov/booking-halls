import { Autocomplete, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dates } from '../hooks/useContext';

export const SelectionButton = ({ names}) => {
    const [dates, setDates] = useContext(Dates);
    const navigate = useNavigate()
    const handlePageHall = async (name) => {
        if (name === "all halls") {
            setDates({dateH:false,dateE:false})
        } else {
            navigate(`/halls/${name}`)
        }
    };
    const top100Films = [{ label: "all halls" }, ...names]
    return (
        <div style={{ display: "inline-block" }}>
            <Autocomplete
                autoComplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                    if (!value) { return "" }
                    handlePageHall(value.label)
                }}
                renderInput={(params) => <TextField {...params} label="בחר אולם" />}
            />
        </div>
    )
}
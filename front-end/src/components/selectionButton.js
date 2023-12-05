import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SelectionButton = ()=>{
    const navigate = useNavigate();
    const handlePageHall = async (name) => {
if(name === "all halls"){

}else{
    navigate(`/halls/${name}`)
}
        // Implement your login logic here
        // console.log(`Login attempt with username: ${username} and password: ${password}`);
        // const { data } = await instance.get(`/users/${username}/${password}`);
        // if (typeof data === 'object') {
        //   localStorage.setItem("uesr", JSON.stringify(data))
          
        //   return console.log('ok');
        // } else {
        //   return setIncorrect(true)
        // }
      };
      const top100Films = [{ label: "hall" },{ label: "all halls" }]
    return (
        <div>
            <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: 300 }}
                    onChange={(e, value) => { handlePageHall(value.label) }}
                    renderInput={(params) => <TextField {...params} label="בחר אולם" />}
                /> 
        </div>
    )
}
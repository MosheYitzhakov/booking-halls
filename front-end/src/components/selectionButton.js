import { Autocomplete, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dates } from "../hooks/useContext";

export const SelectionButton = ({ names }) => {
  const [dates, setDates] = useContext(Dates);
  const navigate = useNavigate();
  const handlePageHall = async (name) => {
    setDates({ dateH: false, dateE: false });
    navigate(`/halls/${name}`);
  };
  return (
    <div style={{ display: "inline-block" }}>
      <Autocomplete
        autoComplete
        disablePortal
        id="combo-box-demo"
        options={[...names]}
        sx={{ width: 300 }}
        onChange={(e, value) => {
          if (!value) {
            return "";
          }
          handlePageHall(value.label);
        }}
        renderInput={(params) => <TextField {...params} label="בחר אולם" />}
      />
    </div>
  );
};

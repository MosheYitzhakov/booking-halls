import { Autocomplete, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClientSideContext } from "../hooks/useContext";

export const SelectionButton = ({ nameHalls }) => {
  const {
    dateEvent: [, setDates],
  } = useContext(ClientSideContext);
  const navigate = useNavigate();
  const handlePageHall = async (name) => {
    setDates({ date: false, hebrew_date: false, id_hall: name });
    navigate(`/halls/${name}`);
  };
  return (
    <Autocomplete
      sx={{ width: 300, display: "inline-block" }}
      autoComplete
      disablePortal
      id="combo-box-demo"
      options={nameHalls || ""}
      onChange={(e, nameHall) => {
        handlePageHall(nameHall);
      }}
      renderInput={(params) => <TextField {...params} label="בחר אולם" />}
    />
  );
};

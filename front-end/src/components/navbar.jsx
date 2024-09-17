import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
export const Nuvbar = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={() => {
        navigate("/");
      }}
    >
      חזרה לעמוד ראשי
    </Button>
  );
};

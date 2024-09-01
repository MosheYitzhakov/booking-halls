import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { Orders } from "./orders";
import instance from "../../API";
import { Settings } from "./settings";

export function Main() {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const nauigat = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        let url = "/managers/orders/";
        if (path[3] === "futureOrders") {
          url += "futureOrders/";
        } else if (path[3] === "invoices" && !path[4]) {
          url = "/managers/invoices/";
        } else if (path[3] === "invoices" && path[4] === "sum") {
          url = "/managers/invoices/sum/";
        } else if (path[3] === "settings") {
          url = "/managers/settings/";
        }
        console.log(url);
        const { data } = await instance.get(url + path[2], {
          headers: { auth: JSON.parse(localStorage.uesrToken) },
        });
        if (
          data === "on token" ||
          data === "No found Correct authentication "
        ) {
          nauigat("/managers/login", { state: " החיבור התנתק לצורך אימות " });
        }
        console.log(data);
        setData(data);
      } catch (error) {
        return error.message;
      }
    };
    fetch();
  }, [pathname]);

  const handleLink = async ({ target }) => {
    if (target.value === "sum") {
      nauigat(`/managers/${path[2]}/invoices/sum/`);
    } else {
      const url = `/${path[1]}/${path[2]}/${target.value}`;
      nauigat(url);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        "& > *": {
          m: 1,
        },
        height: "100%",
      }}
    >
      {typeof data === "object" && path[3] === "settings" ? (
        <Settings data={data} />
      ) : (
        <Orders data={data} />
      )}

      <ButtonGroup
        sx={{ width: "25%", marginRight: 0 }}
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button
          sx={{ height: "15rem", fontSize: "1.5rem" }}
          key="one"
          value="settings"
          onClick={(e) => {
            handleLink(e);
          }}
        >
          הגדרות אולם
        </Button>
        ,
        <Button
          sx={{ height: "15rem", fontSize: "1.5rem" }}
          key="two"
          value="futureOrders"
          onClick={(e) => {
            handleLink(e);
          }}
        >
          הזמנות עתידיות
        </Button>
        ,
        <Button
          sx={{ height: "15rem", fontSize: "1.5rem" }}
          key="three"
          value="allOrders"
          onClick={(e) => {
            handleLink(e);
          }}
        >
          כל ההזמנות
        </Button>
        ,
        <Button
          sx={{ height: "15rem", fontSize: "1.5rem" }}
          key="three"
          value="invoices"
          onClick={(e) => {
            handleLink(e);
          }}
        >
          חשבוניות
        </Button>
        ,
        <Button
          sx={{ height: "15rem", fontSize: "1.5rem" }}
          key="three"
          value="sum"
          onClick={(e) => {
            handleLink(e);
          }}
        >
          סיכום חודשי
        </Button>
        ,
      </ButtonGroup>
    </Box>
  );
}

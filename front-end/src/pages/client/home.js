import React, { useContext, useEffect } from "react";
import HallForList from "../../components/listHall";
import Calendar from "../../components/calendar";
import { SelectionButton } from "../../components/selectionButton";
import { Effect } from "../../hooks/useEffect";
import { Order, orderDataDefault } from "../../hooks/useContext";

export const Home = () => {
  const [dataOrder, setDataOrder] = useContext(Order);
  useEffect(() => {
    setDataOrder(orderDataDefault);
  }, []);
  const halls = Effect("/");
  const nameHalls = halls?.map(({ name_hall }) => ({ label: name_hall })) || "";
  return (
    <>
      <SelectionButton names={nameHalls} />
      <Calendar />
      <div>{halls && <HallForList halls={halls} />}</div>
    </>
  );
};

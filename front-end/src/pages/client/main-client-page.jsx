import React, { useContext, useEffect } from "react";
import HallForList from "../../components/listHall";
import Calendar from "../../components/calendar";
import { SelectionButton } from "../../components/selectionButton";
import { UseEffect } from "../../hooks/useEffect";
import {
  defaultClient,
  defaultOrder,
  defaultInvoice,
} from "../../hooks/useContext";
import { ClientSideContext } from "../../hooks/useContext";
import { Loading } from "../../components/loading";

export const MainClientPage = () => {
  const {
    clients: [, setClients],
    order: [, setOrder],
    invoice: [, setInvoice],
  dateEvent: [, setDateEvent],
  } = useContext(ClientSideContext);

  useEffect(() => {
    setDateEvent(prv =>{
      return {
        ...prv,
        id_hall: null,
      }});
    setClients({
      clientC: defaultClient("c"),
      clientK: defaultClient("k"),
    });
    setOrder(defaultOrder);
    setInvoice(defaultInvoice);
  }, []);
  const halls = UseEffect("/");
  if (!halls) return <Loading />;
  return (
    <>
      <SelectionButton nameHalls={halls.map(({ name_hall }) => name_hall)} />
      <Calendar />
      <HallForList halls={halls} />
    </>
  );
};

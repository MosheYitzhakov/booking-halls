import { createContext, useState } from "react";

export const ClientSideContext = createContext();

export const defaultClient = (side) => ({
  name: null,
  phone: null,
  email: null,
  side: side,
  degree: "client",
});

export const defaultOrder = {
  id_hall: null,
  date: null,
  hebrew_date: null,
  num_guests: null,
  num_m_adults: null,
  num_m_bar: null,
  num_m_children: null,
  total_payment: null,
  type: "b",
};

export const defaultDateEvent = {
  date: null,
  hebrew_date: null,
  id_hall: null,
};

export const defaultInvoice = {
  payment: null,
  submits: null,
};

export const UseContext = ({ children }) => {
  const [clients, setClients] = useState({
    clientC: defaultClient("c"),
    clientK: defaultClient("k"),
  });
  const [order, setOrder] = useState(defaultOrder);
  const [dateEvent, setDateEvent] = useState(defaultDateEvent);
  const [invoice, setInvoice] = useState(defaultInvoice);

  const contextValue = {
    clients: [clients, setClients],
    order: [order, setOrder],
    dateEvent: [dateEvent, setDateEvent],
    invoice: [invoice, setInvoice],
  };

  return (
    <ClientSideContext.Provider value={contextValue}>
      {children}
    </ClientSideContext.Provider>
  );
};

export default UseContext;

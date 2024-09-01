import { createContext, useState } from "react";
export const Dates = createContext();
export const Order = createContext();

export const orderDataDefault = {
  clientC: {
    name: "",
    phone: "",
    email: "",
    side: "c",
    degree: "client",
  },
  clientK: {
    name: "",
    phone: "",
    email: "",
    side: "k",
    degree: "client",
  },
  order: {
    id_hall: "",
    date: "",
    hebrew_date: "",
    num_guests: "",
    num_m_adults: "",
    num_m_bar: "",
    num_m_children: "",
    total_payment: "",
    type: "b",
  },
  dateEvent: {
    date: "",
    hebrew_date: "",
    id_hall: "",
  },
  invoice: {
    payment: "",
    submits: "",
  },
};
export const DatesAndOrderContext = ({ children }) => {
  const [alldates, setallDates] = useState({ dateH: "", dateE: "" });
  const [alldataOrder, setAlldataOrder] = useState(orderDataDefault);
  return (
    <Dates.Provider value={[alldates, setallDates]}>
      <Order.Provider value={[alldataOrder, setAlldataOrder]}>
        {children}
      </Order.Provider>
    </Dates.Provider>
  );
};

export default DatesAndOrderContext;

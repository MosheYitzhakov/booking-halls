import { createContext} from "react";
export const Dates = createContext()

export const Order = createContext()
export const orderDataDefault = {
    clientC: {
      name: '', phone: '', email: '', side: "c", degree: "client"
    }, clientK: {
      name: '', phone: '', email: '', side: "k", degree: "client"
    }, order: {
      id_hall: "",
      date: "",
      hebrew_date: "",
      num_guests: "",
      num_m_adults: "",
      num_m_bar: "",
      num_m_children: "",
      total_payment: "",
      type: "b",
    }, dateEvent: {
      date: "",
      hebrew_date: "",
      id_hall: "",
    }, invoice: {
      payment: "",
      date: "",
      hebrew_date: "",
      submits:""
    }
  } 



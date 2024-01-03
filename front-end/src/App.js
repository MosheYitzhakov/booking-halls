import './App.css';
import { Routes, Route } from "react-router-dom";
import { Hall } from './pages/client/hall';
import { Home } from './pages/client/home';
import { Login } from './pages/manager/login';
import { Main } from './pages/manager/main';
import { Err } from './error';
import Header from './components/header';
import { useState } from 'react';
import { Dates, Order } from './hooks/useContext';



function App() {
  const [alldates, setallDates] = useState({ dateH: "", dateE: "" })
  const [alldataOrder, setAlldataOrder] = useState({
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
  })
  return (
    <div className="App" style={{ width: "100%", height: "100vh"}}>
      <Header />
      <Dates.Provider value={[alldates, setallDates]}>
        <Order.Provider value={[alldataOrder, setAlldataOrder]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Home />} />
            <Route path="/halls/:name" element={<Hall /> ? <Hall /> : <Hall />} />

            <Route path="managers/login" element={<Login />} />
            <Route path="managers/:name/settings" element={<Main /> ? <Main /> : <Login />} />
            <Route path="managers/:name/allOrders" element={<Main /> ? <Main /> : <Login />} />
            <Route path="managers/:name/futureOrders" element={<Main /> ? <Main /> : <Login />} />
            <Route path="managers/:name/invoices" element={<Main /> ? <Main /> : <Login />} />
            <Route path="managers/:name/invoices/sum" element={<Main /> ? <Main /> : <Login />} />
            <Route path="managers/*" element={<Login />} />

            <Route path="*" element={<Err />} />
          </Routes>
        </Order.Provider>
      </Dates.Provider>
    </div>
  );
}



export default App;

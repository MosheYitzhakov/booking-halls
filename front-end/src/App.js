import './App.css';
import { Routes, Route } from "react-router-dom";
import { Hall } from './pages/client/hall';
import { Home } from './pages/client/home';
import { Login } from './pages/manager/login';
import { Main } from './pages/manager/main';
import { Err } from './error';
import Header from './components/header';
import { useState } from 'react';
import { Dates } from './hooks/useContext';



function App() {
  const [alldates, setallDates] = useState({dateH:"",dateE:""})
  return (
    <div className="App" style={{width:"100%", height:"100%"}}>
      <Header />
      <Dates.Provider value={[alldates, setallDates]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Home />} />
          <Route path="/halls/:name" element={<Hall /> ? <Hall  /> : <Hall />} />

        <Route path="managers/login" element={<Login />} />
        <Route path="managers/:name/settings" element={<Main /> ? <Main /> : <Login />}/>
        <Route path="managers/:name/allOrders" element={<Main /> ? <Main /> : <Login />}/>
        <Route path="managers/:name/futureOrders" element={<Main /> ? <Main /> : <Login />}/>
        <Route path="managers/:name/invoices" element={<Main /> ? <Main /> : <Login />}/>
        <Route path="managers/*" element={<Login />} />

        <Route path="*" element={<Err />} />
      </Routes>
    </Dates.Provider>  
    </div>
  );
}



export default App;

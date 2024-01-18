import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { Hall } from './pages/client/hall';
import { Home } from './pages/client/home';
import { Login } from './pages/manager/login';
import { Main } from './pages/manager/main';
import { Err } from './error';
import Header from './components/header';
import { DatesAndOrderContext } from './hooks/useContext';



function App() {
  const { state } = useLocation();
  return (
    <div className="App" style={{ width: "100%", height: "100vh"}}>
      <Header />
        <DatesAndOrderContext>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Home />} />
            <Route path="/halls/:name" element={<Hall /> ? <Hall /> : <Hall />} />

            <Route path="managers/login" element={<Login state={state}/>} />
            <Route path="managers/:name/settings" element={<Main /> ? <Main /> : <Login state={state}/>} />
            <Route path="managers/:name/allOrders" element={<Main /> ? <Main /> : <Login state={state}/>} />
            <Route path="managers/:name/futureOrders" element={<Main /> ? <Main /> : <Login state={state}/>} />
            <Route path="managers/:name/invoices" element={<Main /> ? <Main /> : <Login state={state}/>} />
            <Route path="managers/:name/invoices/sum" element={<Main /> ? <Main /> : <Login state={state}/>} />
            <Route path="managers/*" element={<Login state={state}/>} />

            <Route path="*" element={<Err />} />
          </Routes>
          </DatesAndOrderContext>
    </div>
  );
}



export default App;

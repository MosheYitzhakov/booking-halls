import './App.css';
import { Routes, Route } from "react-router-dom";
import { Hall } from './pages/client/hall';
import { Home } from './pages/client/home';
import { Login } from './pages/manager/login';
import { Main } from './pages/manager/main';
import { FutureOrders } from './pages/manager/futureOrders';
import { AllOrders } from './pages/manager/allOrders';
import { Settings } from './pages/manager/settings';
import { Invoices } from './pages/manager/Invoices';
import { Err } from './error';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Home />} />
        <Route path="/halls/:name" element={<Hall /> ? <Hall /> : <Hall />} />

        <Route path="managers/" element={<Login />} />
        <Route path="managers/login" element={<Login />} />
        <Route path="managers/:name" element={<Main /> ? <Main /> : <Err />}>
          <Route path="settings" element={<Settings /> ? <Settings /> : <Err />} />
          <Route path="futureOrders" element={<FutureOrders /> ? <FutureOrders /> : <Err />} />
          <Route path="allOrders" element={<AllOrders /> ? <AllOrders /> : <Err />} />
          <Route path="invoices" element={<Invoices /> ? <Invoices /> : <Err />} />
        </Route>

        <Route path="*" element={<Err />} />
      </Routes>
    </div>
  );
}



export default App;

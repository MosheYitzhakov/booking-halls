import "./App.css";
import { Routes, Route, useLocation, useRoutes } from "react-router-dom";
import { Hall } from "./pages/client/hall";
import { Home } from "./pages/client/home";
import { Login } from "./pages/manager/login";
import { Main } from "./pages/manager/main";
import { Err } from "./error";
import Header from "./components/header";
import { DatesAndOrderContext } from "./hooks/useContext";
import { ManagerRoute } from "./routes/manager-routes";
import { ClientRoute } from "./routes/client-route";
// import * from './routes/client-route';

function App() {
  const { pathname } = useLocation();
  console.log(pathname);
  
  const routes = pathname.startsWith('/managers') ? 
  [
    {
      path: 'managers/*',
      element: <ManagerRoute />,
    },
  ] 
  : 
  [
    {
      path: '*',
      element: <ClientRoute />,
    },
  ];

const element = useRoutes(routes);
  // return (
  //   <div className="App" style={{ width: "100%", height: "100vh" }}>
  //     <Header />

  //     <Routes>
  //       {pathname.split("/")[1] === "managers" ? (
  //         <Route path="managers/*" element={<ManagerRoute />} />
  //       ) : (
  //         <Route path="*" element={<ClientRoute />} />
  //       )}
  //     </Routes>

  //     {/* <DatesAndOrderContext>
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/main" element={<Home />} />
  //           <Route path="/halls/:name" element={<Hall /> ? <Hall /> : <Hall />} />

  //           <Route path="managers/login" element={<Login state={state}/>} />
  //           <Route path="managers/:name/settings" element={<Main /> ? <Main /> : <Login state={state}/>} />
  //           <Route path="managers/:name/allOrders" element={<Main /> ? <Main /> : <Login state={state}/>} />
  //           <Route path="managers/:name/futureOrders" element={<Main /> ? <Main /> : <Login state={state}/>} />
  //           <Route path="managers/:name/invoices" element={<Main /> ? <Main /> : <Login state={state}/>} />
  //           <Route path="managers/:name/invoices/sum" element={<Main /> ? <Main /> : <Login state={state}/>} />
  //           <Route path="managers/*" element={<Login state={state}/>} />

  //           <Route path="*" element={<Err />} />
  //         </Routes>
  //         </DatesAndOrderContext> */}
  //   </div>
  // );
  return     <div className="App" style={{ width: "100%", height: "100vh"}}>
      <Header />{element}</div>;
}

export default App;

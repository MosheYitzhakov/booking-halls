import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "../pages/manager/login";
import { Main } from "../pages/manager/main";

export const ManagerRoute = () => {
  const { state } = useLocation();
  return (
    <Routes>
      <Route path="/managers/login" element={<Login state={state} />} />
      <Route
        path=":name/settings"
        element={<Main /> ? <Main /> : <Login state={state} />}
      />
      <Route
        path="/:name/allOrders"
        element={<Main /> ? <Main /> : <Login state={state} />}
      />
      <Route
        path="/:name/futureOrders"
        element={<Main /> ? <Main /> : <Login state={state} />}
      />
      <Route
        path="/:name/invoices"
        element={<Main /> ? <Main /> : <Login state={state} />}
      />
      <Route
        path="/:name/invoices/sum"
        element={<Main /> ? <Main /> : <Login state={state} />}
      />
      <Route path="*" element={<Login state={state} />} />
    </Routes>
  );
};

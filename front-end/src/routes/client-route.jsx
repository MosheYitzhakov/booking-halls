import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/client/home";
import { Err } from "../error";
import DatesAndOrderContext from "../hooks/useContext";
import { Hall } from "../pages/client/hall";

export const ClientRoute = () => {
  return (
    <DatesAndOrderContext>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/main" element={<Home />} /> */}
        <Route path="/halls/:name" element={<Hall /> ? <Hall /> : <Hall />} />
        <Route path="*" element={<Err />} />
      </Routes>
    </DatesAndOrderContext>
  );
};

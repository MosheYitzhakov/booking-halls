import { Route, Routes } from "react-router-dom";
import { MainClientPage } from "../pages/client/main-client-page";
import { Err } from "../error";
import ClientSideContext from "../hooks/useContext";
import { Hall } from "../pages/client/hall";

export const ClientRoute = () => {
  return (
    <ClientSideContext>
      <Routes>
        <Route path="/" element={<MainClientPage />} />
        <Route path="/halls/:name" element={<Hall />} />
        <Route path="*" element={<Err />} />
      </Routes>
    </ClientSideContext>
  );
};

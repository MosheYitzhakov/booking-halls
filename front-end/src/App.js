import "./App.css";
import { useLocation, useRoutes } from "react-router-dom";
import Header from "./components/header";
import { ManagerRoute } from "./routes/manager-routes";
import { ClientRoute } from "./routes/client-route";

function App() {
  const { pathname } = useLocation();
  const routes = pathname.startsWith("/managers")
    ? [
        {
          path: "managers/*",
          element: <ManagerRoute />,
        },
      ]
    : [
        {
          path: "*",
          element: <ClientRoute />,
        },
      ];
  return (
    <div className="App">
      <Header />
      {useRoutes(routes)}
    </div>
  );
}

export default App;

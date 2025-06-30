import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import BasicRoutes from "./routes/BasicRoutes";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <BasicRoutes />
  </BrowserRouter>
);

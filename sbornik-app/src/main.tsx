import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'katex/dist/katex.min.css';
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/MNAU-Physics-Interractive-Labs/">
    <App />
  </BrowserRouter>
);
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PendulumLab from "./pages/PendulumLab";
import YoungLab1 from "./pages/YoungLab1";
import YoungLab2 from "./pages/YoungLab2";
import PitomaVagaPage from "./pages/PitomaVaga";
import './App.css'
import StocksPage from "./pages/StocksPage";
import PoverxPage from "./pages/PoverxPage";
import VologPage from "./pages/VologPage";
import AdiabPage from "./pages/AdiabPage";
import OberbekPage from "./pages/OberbekPage";


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pendulum" element={<PendulumLab />} />
      <Route path="/young1" element={<YoungLab1 />} />
      <Route path="/young2" element={<YoungLab2 />} />
      <Route path="/pitomaVaga" element={<  PitomaVagaPage />} />
      <Route path="/stocks" element={<StocksPage />} />
      <Route path="/poverx" element={<PoverxPage />} />
      <Route path="/volog" element={<VologPage />} />
      <Route path="/adiab" element={<AdiabPage />} />
      <Route path="/oberbek" element={<OberbekPage />} />
    </Routes>
  );
};

export default App;
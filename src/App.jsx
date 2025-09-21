import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import Navbar from "./components/Navbar";
import Retirements from "./pages/Retirements";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/retirements" element={<Retirements />} />
      </Routes>
    </>
  );
}

export default App;

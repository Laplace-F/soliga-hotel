import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/:slug" element={<RoomDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader/Preloader.jsx";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import ApplyServices from "./pages/ApplyNow/ApplyServices.jsx";
import FullTeam from "./components/Team/FullTeam.jsx";
import TEDxTalksFullPage from "./components/TEDxTalksSection/TEDxTalksFullPage";
import { TEAM } from "./data/homeData";

function App() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  return (
    <>
      {!loadingFinished && (
        <Preloader onFinish={() => setLoadingFinished(true)} />
      )}
      {loadingFinished && (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<ApplyServices />} />
            <Route path="/team-full" element={<FullTeam team={TEAM} />} />
            <Route path="/talks" element={<TEDxTalksFullPage />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;

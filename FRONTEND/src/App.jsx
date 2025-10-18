import React, { useState } from "react";
import Preloader from "./components/Preloader/Preloader.jsx";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  return (
    <>
      {!loadingFinished && (
        <Preloader onFinish={() => setLoadingFinished(true)} />
      )}
      {loadingFinished && (
        <div>
          <Navbar />
          <Home />
        </div>
      )}
    </>
  );
}

export default App;
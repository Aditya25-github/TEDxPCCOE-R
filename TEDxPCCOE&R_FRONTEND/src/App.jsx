import React, { useState } from "react";
import Preloader from "./components/Preloader/Preloader.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  return (
    <>
      {!loadingFinished && (
        <Preloader
          duration={3000} // animation duration
          onFinish={() => setLoadingFinished(true)}
        />
      )}
      {loadingFinished && (
        <div>
          <Home></Home>
        </div>
      )}
    </>
  );
}

export default App;

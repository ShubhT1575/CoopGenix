import { useEffect, useState } from "react";
import "./style/App.css";
import "./style/index.css";
import "./style/style.css"
import "./style/StyledButton.css"
import AppRoutes from "./components/Routes/AppRoutes";
import { useLocation } from "react-router-dom";


function App() {
  return (
    <>
      <AppRoutes/>
    </>
  );
}

export default App;

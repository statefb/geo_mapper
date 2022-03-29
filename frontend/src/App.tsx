import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { DrawerProvider } from "./providers/drawer";
import AppBarMain from "./components/AppBarMain";
import AppDrawer from "./components/AppDrawer";
import Main from "./pages/Main";

function App() {
  return (
    <>
      <DrawerProvider>
        <AppBarMain></AppBarMain>
        <AppDrawer></AppDrawer>
      </DrawerProvider>

      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>
    </>
  );
}

export default App;

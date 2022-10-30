import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoomPage } from "../pages/RoomPage";

import { NotFound404 } from "../pages/NotFound404";
import { MainPage } from "../pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainPage />} path="/" />
        <Route element={<RoomPage />} path="/room/:id" />
        <Route element={<NotFound404 />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

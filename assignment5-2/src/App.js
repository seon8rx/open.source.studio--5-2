import React from "react";
import { Routes, Route } from "react-router-dom";
import ShowList from "./components/Pages/ShowList";
import DetailPage from "./components/Pages/DetailPage";
import UpdatePage from "./components/Pages/UpdatePage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ShowList />} />
            <Route path="/list" element={<ShowList />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
            <Route path="/create" element={<UpdatePage />} />
        </Routes>
    );
}

export default App;
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
    </Router>
);
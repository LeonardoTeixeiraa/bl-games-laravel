import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app/App.tsx";
import Login from "./app/components/Auth/Login";
import Register from "./app/components/Auth/Register";
import axios from "axios";
import "./styles/index.css";

// Use the same origin in production; optionally override during development.
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>,
);

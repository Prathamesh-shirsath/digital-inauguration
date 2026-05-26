import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import DisplayScreen from "./pages/display/DisplayScreen";
import CreateInauguration from "./pages/admin/CreateInauguration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-inauguration"
          element={<CreateInauguration />}
        />

        <Route
          path="/display"
          element={<DisplayScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
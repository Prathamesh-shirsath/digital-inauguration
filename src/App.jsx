import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import DisplayScreen from "./pages/display/DisplayScreen";
import CreateInauguration from "./pages/admin/CreateInauguration";
import InaugurateEvent from "./pages/admin/InaugurateEvent";
import EventControl from "./pages/admin/EventControl";
import ManageEvents from "./pages/admin/ManageEvents";

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

        <Route
          path="/inaugurate-event"
          element={<InaugurateEvent />}
        />


        <Route
          path="/event-control/:id"
          element={<EventControl />}
        />


        <Route
          path="/manage-events"
          element={<ManageEvents />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
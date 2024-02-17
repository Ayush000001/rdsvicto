import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./scress";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import RestrictedRoutes from "./PrivateRoutes/RestrictedRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Router>
        <PrivateRoutes />
        <Routes>
          <Route element={<RestrictedRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App;
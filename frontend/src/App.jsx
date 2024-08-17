import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { Transfer } from "./pages/Transfer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />} />
        <Route index path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/transfer/:id" element={<Transfer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

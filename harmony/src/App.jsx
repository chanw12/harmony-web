import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import SignUp from "./pages/signup/signup";

export default function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <div>
        <Header />
        <Routes>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

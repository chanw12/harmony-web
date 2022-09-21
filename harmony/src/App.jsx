import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";

export default function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <div>
        <Routes>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
          <Route path="signin" element={<SignIn></SignIn>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

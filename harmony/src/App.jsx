import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";

export default function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Routes>
        <Route path="signup" element={<SignUp></SignUp>}></Route>
        <Route path="/" element={<SignIn></SignIn>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import SignUp from "./pages/signup/signup";

export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes></Routes>
    </BrowserRouter>
  );
}

import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import VerifyCode from "./pages/Auth/VerifyCode.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login/> },
    { path: "/verify", element: <VerifyCode /> }
]);
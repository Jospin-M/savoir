import { createBrowserRouter } from "react-router-dom";

import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import VerifyCode from "./pages/Auth/VerifyCode.tsx";
import Background from "./components/auth/Background.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <Background/> }, // will be replaced with home page
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login/> },
    { path: "/verify", 
      element: 
        <PrivateRoute>
            <VerifyCode /> 
        </PrivateRoute>
    }
]);
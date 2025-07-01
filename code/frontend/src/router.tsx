import { createBrowserRouter } from "react-router-dom";

import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import VerifyAccount from "./pages/Auth/VerifyAccount.tsx";
import Background from "./components/auth/Background.tsx";
import ResetPassword from "./pages/Auth/ResetPassword.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <Background/> }, // will be replaced with home page
    { path: "/auth/signup", element: <SignUp /> },
    { path: "/auth/login", element: <Login/> },
    { path: "/auth/verify", 
      element: 
        <PrivateRoute>
            <VerifyAccount /> 
        </PrivateRoute>
    },
    { path: "/auth/password/reset", element: <ResetPassword/> }
]);
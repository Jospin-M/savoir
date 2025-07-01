import { createBrowserRouter } from "react-router-dom";

import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import VerifyAccountRegistration from "./pages/Auth/VerifyAccountRegistration.tsx";
import VerifyAccountLogin from "./pages/Auth/VerifyAccountLogin.tsx";
import Background from "./components/auth/Background.tsx";
import ResetPassword from "./pages/Auth/ResetPassword.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <Background/> }, // will be replaced with home page
    { path: "/auth/signup", element: <SignUp /> },
    { path: "/auth/login", element: <Login/> },
    { path: "/auth/verifyRegistration", 
      element: 
        <PrivateRoute>
            <VerifyAccountRegistration /> 
        </PrivateRoute>
    },
    { path: "/auth/password/reset", element: <ResetPassword/> },
    { path: "/auth/verifyAccount",
      element:
        <PrivateRoute>
            <VerifyAccountLogin/>
        </PrivateRoute>
    }
]);
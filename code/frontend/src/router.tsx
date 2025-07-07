import { createBrowserRouter } from "react-router-dom";

import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import VerifyAccount from "./pages/Auth/VerifyAccount.tsx";
import ChangePassword from "./pages/Auth/ChangePassword.tsx";
import InitiateReset from "./pages/Auth/InitiatePasswordReset.tsx";

import Authenticated from "./pages/Profile/Authenticated.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <Login /> }, // will be replaced with home page
    { path: "/auth/signup", element: <SignUp /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/verifyRegistration", element: <VerifyAccount /> },
    { path: "/auth/password/sendResetLink", element: <InitiateReset /> },
    { path: "/auth/password/reset", element: <ChangePassword /> },

    { 
        path: "/:id", 
        element: <Authenticated /> // handle backend logic for which page is shown after frontend has been created
    }
]);
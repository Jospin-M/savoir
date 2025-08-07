import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import VerifyAccount from "./pages/Auth/VerifyAccount.tsx";
import ChangePassword from "./pages/Auth/ChangePassword.tsx";
import InitiateReset from "./pages/Auth/InitiatePasswordReset.tsx";
import Authenticated from "./pages/Profile/Authenticated.tsx";
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    { 
        path: "/", 
        element: 
            <ProtectedRoute>
                <Authenticated /> 
            </ProtectedRoute>
    }, // the child of ProtectedRoute will be Dashboard when it's created, this is just a placedholder
    { path: "/auth/signup", element: <SignUp /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/verify", element: <VerifyAccount /> },
    { path: "/auth/password/sendResetLink", element: <InitiateReset /> },
    { path: "/auth/password/reset", element: <ChangePassword /> },

    { 
        path: "/profile/:id", // combination of user fullname and id for unique identifier
        element: 
            <ProtectedRoute>
                <Authenticated /> 
            </ProtectedRoute>, 
        // handle backend logic for which type of profile page is shown after frontend has been created
    },
]);

// each loader will contain the necessary data required for that page, so that requests to the API 
// are minimized. also consider seperating the function calls within each function into their own
// own files depending on complexity
import { createBrowserRouter } from "react-router-dom";

import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import VerifyAccount from "./pages/Auth/VerifyAccount.tsx";
import VerifyEmail from "./pages/Auth/VerifyEmail.tsx";
import Background from "./components/auth/Background.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";
import ChangePassword from "./pages/Auth/ChangePassword.tsx";
import InitiateReset from "./pages/Auth/InitiatePasswordReset.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <Background/> }, // will be replaced with home page
    { path: "/auth/signup", element: <SignUp /> },
    { path: "/auth/login", element: <Login/> },
    { path: "/auth/verifyRegistration", 
      element: 
        <PrivateRoute>
            <VerifyAccount /> 
        </PrivateRoute>
    },
    { path: "/auth/password/sendResetLink", element: <InitiateReset /> },
    { path: "/auth/verifyAccount",
      element:
        <PrivateRoute>
            <VerifyEmail />
        </PrivateRoute>
    },
    { path: "/auth/password/reset",
      element:
        <PrivateRoute>
          <ChangePassword />
        </PrivateRoute>
    }
]);
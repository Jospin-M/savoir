import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import VerifyAccount from "./pages/Auth/VerifyAccount.tsx";
import ChangePassword from "./pages/Auth/ChangePassword.tsx";
import InitiateReset from "./pages/Auth/InitiatePasswordReset.tsx";
import Authenticated from "./pages/Profile/Authenticated.tsx";
import Browse from "./pages/Browse/Browse.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Messages from "./pages/Messages/Messages.tsx";

import { createBrowserRouter } from "react-router-dom";

import { getUserID } from "../lib/utils.ts";
import { sendAuthenticatedHTTPRequest } from "../lib/utils.ts";

let globalProfileImageURL = "";

export const router = createBrowserRouter([
    { path: "/", element: <Login /> }, // will be replaced with home page
    { path: "/auth/signup", element: <SignUp /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/verifyRegistration", element: <VerifyAccount /> },
    { path: "/auth/password/sendResetLink", element: <InitiateReset /> },
    { path: "/auth/password/reset", element: <ChangePassword /> },

    { path: "/browse/", element: <Browse />, loader: browserLoader },
    { path: "/dashboard/", element: <Dashboard />, loader: dashboardLoader },
    { path: "/inbox/", element: <Messages />, loader: inboxLoader },
    
    { 
        path: "/profile/:id", // combination of user fullname and id for unique identifier
        element: <Authenticated />, // handle backend logic for which type of profile page is shown after frontend has been created
        loader: profileLoader
    },
]);

// each loader will contain the necessary data required for that page, so that requests to the API 
// are minimized. also consider seperating the function calls within each function into their own
// own files depending on complexity

async function browserLoader() {
    return {
        globalProfileImageURL
    };
}

async function dashboardLoader() {
    return {
        globalProfileImageURL
    };
}

async function inboxLoader() {
    return {
        globalProfileImageURL
    };
}

async function profileLoader() {
    const profileData = await sendAuthenticatedHTTPRequest(`/auth/profile/${getUserID()}`, "GET", {});
    const { profileImageUrl } = profileData;
    globalProfileImageURL = profileImageUrl;

    return {
        profileData
    }
}
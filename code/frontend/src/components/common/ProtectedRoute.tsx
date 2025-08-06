import type { ReactNode } from "react";

import { useUserStore } from "../../stores/useUserStore"
import Login from "../../pages/Auth/Login";


function isLoggedIn() {
    const userID = useUserStore((state) => state.userID);
    
    return userID !== null;
}

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    if(isLoggedIn()) {
        return children;
    }

    return <Login />;
}
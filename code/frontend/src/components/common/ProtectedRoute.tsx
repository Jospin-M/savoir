import type { ReactNode } from "react";

import { useUserStore } from "../../stores/useUserStore"
import Login from "../../pages/Auth/Login";


export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const userID = useUserStore((state) => state.userID);
    if(userID !== null) {
        return children;
    }

    return <Login />;
}
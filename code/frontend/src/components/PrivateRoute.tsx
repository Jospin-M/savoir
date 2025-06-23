import { type ReactNode} from "react";
import { Navigate } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";

export function PrivateRoute({ children }: {children: ReactNode }) {
    const { session } = UserAuth();
    
    // control the access to the children based on whether session data is present
    return (
        <>{session ? <>{children}</> : <Navigate to="/signup"/>}</>
    );
}
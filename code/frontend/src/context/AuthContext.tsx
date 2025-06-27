import { createContext, useEffect, useState, useContext, type ReactNode } from "react";
//import { supabase } from "../../../backend/src/clients/supabaseClient.ts";

type AuthContextType = {
    session: any
}

const AuthContext = createContext<AuthContextType>({
    session: undefined
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [ session, setSession ] = useState({})!;

    /**
     * 1. make requests to backend to update session
     */

    useEffect(() => {
       // updateSession(setSession);
    }, []);

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UserAuth() {
    return useContext(AuthContext);
}
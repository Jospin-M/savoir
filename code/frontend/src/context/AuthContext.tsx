import { createContext, useEffect, useState, useContext, type ReactNode } from "react";
//import { updateSession } from "../../../backend/src/clients/authClient.ts";

type AuthContextType = {
    session: any
}

const AuthContext = createContext<AuthContextType>({
    session: undefined
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [ session, setSession ] = useState({})!;

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
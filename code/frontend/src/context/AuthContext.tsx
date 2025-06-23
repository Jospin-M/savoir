import { createContext, useEffect, useState, useContext, type ReactNode } from "react";
import { logInUser, signUpNewUser, signOut, updateSession } from "../../../backend/config/supabaseClient.ts";

type AuthContextType = {
    session: any;
    signUpNewUser: Function;
    signOut: Function,
    logInUser: Function
}

const AuthContext = createContext<AuthContextType>({
    session: undefined,
    signUpNewUser: ()=>{},
    signOut: ()=>{},
    logInUser: ()=>{}
})

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [ session, setSession ] = useState({})!;

    useEffect(() => {
        updateSession(setSession);
    }, []);

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signOut, logInUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UserAuth() {
    return useContext(AuthContext);
}
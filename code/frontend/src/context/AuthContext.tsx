import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import supabase from "../../lib/utils";

type AuthContextType = {
    session: any;
    setSession: React.Dispatch<React.SetStateAction<{}>>;
}

const AuthContext = createContext<AuthContextType>({
    session: undefined,
    setSession: ({}) => {}
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [ session, setSession ] = useState({})!; // using context may not be necessary

    useEffect(() => {
        // handle token refresh 
        const { data } = supabase.auth.onAuthStateChange((session) => {
            console.log(session);

            if(session === "SIGNED_OUT") {
                
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    );
}

export function getContext() {
    return useContext(AuthContext);
}
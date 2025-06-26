import { supabase, insertData } from "./supabaseClient"

import type { RegistrationForm } from "../types/forms";
import type { UsersSchema } from "../types/tableSchemas";

import * as utils from "../routes/utils";

type AuthCredentials = {
    email: string,
    password: string
}

export async function logInUser(req: any, res: any, next: Function) {
    const { email, password }: AuthCredentials = req.body;
   
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if(!data.user) {
        req.error = error;
        
        next();
    } else {
        utils.sendHTTPResponse(res, 200, data);
    }
}

export async function signUpNewUser({ fullName, email, password }: RegistrationForm) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if(error) {
        console.error("There was a problem signing up: ", error);

        return { success: false, error };
    }

    // this code should be added to the service code - the services will be middleware
    const id: string = data.user!.id;
    const [ first_name, last_name ] = fullName.split(" ");

    // handle case where there is already an account with that email

    return insertData<UsersSchema>("users", { id, first_name, last_name, email })
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if(error) {
        console.error("There was an error signing out: ", error);
    }
}

export function updateSession(setSession: React.Dispatch<React.SetStateAction<{}>>) {
    type Data = {
        data: any
    };
    
    supabase.auth.getSession().then(({ data }: Data) => {
        setSession(data.session); // research why session needs to be passed here
    });

    supabase.auth.onAuthStateChange((_event: Event, session: any) => {
        if(session) {
            setSession(session);
        } // maybe default to no session if no valid one is found
    });
}

// PUT MAIL SERVICE HERE

/*
    - when implementing server, create endpoint for each table and it
*/
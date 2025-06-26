import { supabase, insertData } from "./supabaseClient";
import React from "react";

import type { RegistrationForm } from "../types/forms";
import type { UsersSchema } from "../types/tableSchemas";

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

    if(error?.status == 400) {
        req.error = error;
        
        next();
    } 
    
    res.send(data);
}

export async function signUpNewUser(req: any, res: any, next: Function) {
    const { fullName, email, password }: RegistrationForm = req.body;
    
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if(error?.status == 422) {
        req.error = error;
        
        next();
    } 
    
    const id: string = data.user!.id;
    const [ first_name, last_name ] = fullName.split(" ");

    res.status(201).json(await insertData<UsersSchema>("users", { id, first_name, last_name, email }));
}

export async function signOut() { // fully implement with server once option is available
    const { error } = await supabase.auth.signOut();

    if(error) {
        console.error("There was an error signing out: ", error);
    }
}

export function updateSession(setSession: React.Dispatch<React.SetStateAction<{}>>) {
    supabase.auth.getSession().then(({ data: { session }} ) => {
        setSession(session!); // might not be necessary, wait until more features have been implemented to decide
    });

    supabase.auth.onAuthStateChange((_event, session) => {
        if(session) {
            setSession(session);
        } // maybe default to no session if no valid one is found
    });
}

// PUT MAIL SERVICE HERE

/*
    - when implementing server, create endpoint for each table and it
*/
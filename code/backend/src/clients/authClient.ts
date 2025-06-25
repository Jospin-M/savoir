import { supabase, insertData } from "./supabaseClient.ts";
import React from "react";

import type { RegistrationForm } from "../types/forms.ts";
import type { UsersSchema } from "../types/tableSchemas.ts";

type AuthCredentials = {
    email: string,
    password: string
}

export async function logInUser({ email, password }: AuthCredentials) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if(error) {
            console.error("Sign in error occured: ", error);

            return {sucess: false, error: error.message}
        }

        console.log("Sign-in success: ", data);

        return { success: true, data };
    } catch(error) {
        console.error("An error occured: ", error);
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

    const id: string = data.user!.id;
    const [ first_name, last_name ] = fullName.split(" ");
    // implement password hashing with bcrypt
    // handle case where there is already an account with that email

    return insertData<UsersSchema>("users", { id, first_name, last_name, email, password })
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if(error) {
        console.error("There was an error signing out: ", error);
    }
}

export function updateSession(setSession: React.Dispatch<React.SetStateAction<{}>>) {
    supabase.auth.getSession().then(({ data: { session }} ) => {
        setSession(session!);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
        if(session) {
            setSession(session);
        } // maybe default to no session if no valid one is found
    });
}

// PUT MAIL SERVICE HERE

/*
    - add user record to 'users' table (after concrete implementation, put generalized version in supabaseClient that
    defines the basic operations (SELECT, INSERT, UPDATE, DELETE) and takes table names as parameters -> services will define wrapper functions
    - 



    - when implementing server, create endpoint for each table and it
*/
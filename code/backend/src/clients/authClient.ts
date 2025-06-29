import { supabase, insertData } from "./supabaseClient";
import React from "react";

import type { RegistrationForm } from "../types/forms";
import type { UsersSchema } from "../types/tableSchemas";

type AuthCredentials = {
    email: string,
    password: string,
}

export async function logInUser(req: any, res: any, next: Function) {
    const { email, password }: AuthCredentials = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if(error) {
        req.error = error;
        
        next();

        return;
    } 
    
    res.send(data); 
}

export async function checkEmail(providedEmail: string) {
    const { count, error } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("email", providedEmail);

    return count == 1;
}

export async function signUpNewUser(req: any, res: any, next: Function) {
    const { fullName, email, password }: RegistrationForm = req.body;

    if(await checkEmail(email)) {
        req.error = { code: "email_exists" };

        next();
        
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if(error) {
        req.error = error; 
        
        next();
    } else {
        const id: string = data.user!.id;
        const [ first_name, last_name ] = fullName.split(" ");

        res.status(201).json({ 
            message: "User account created. Verification needed.", 
            user: { id, first_name, last_name, email }
        });
    }
}

export async function verifyUser(req: any, res: any, next: Function) {
    const { id, first_name, last_name, email } = req.body.verificationRequest.user; 
    const code = req.body.verificationCode.code;
    const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: code,
        type: "signup"
    });

    if(error) {
        req.error = error;

        next();
    } else {
        res.status(201).json({
            message: "Account verified.",
            session: data.session
        });

        insertData<UsersSchema>("users", { id, first_name, last_name, email });
    }
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
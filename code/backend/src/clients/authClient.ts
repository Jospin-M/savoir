import { supabase, insertData } from "./supabaseClient";
import * as dotenv from "dotenv";
import React from "react";

import type { RegistrationForm } from "../types/forms";
import type { UsersSchema } from "../types/tableSchemas";
import type { VerifyOtpParams, UserAttributes } from "@supabase/auth-js";

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

export async function checkEmailExists(providedEmail: string) {
    const { count, error } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("email", providedEmail);

    return count == 1;
}

export async function signUpNewUser(req: any, res: any, next: Function) {
    const { fullName, email, password }: RegistrationForm = req.body;

    if(await checkEmailExists(email)) {
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

        return;
    } else {
        const id: string = data.user!.id;
        const [ first_name, last_name ] = fullName.split(" ");

        res.status(201).json({ 
            message: "User account created. Verification needed.", 
            user: { id, first_name, last_name, email }
        });
    }
}

async function verifyUser(params: VerifyOtpParams) {
    const { data, error } = await supabase.auth.verifyOtp(params);

    if(error) {
        return { error: error };
    } else {
        return {
            message: "Account verified",
            session: data.session
        }
    }
}

export async function verifyNewUser(req: any, res: any, next: Function) {
    const { id, first_name, last_name, email } = req.body.verificationRequest.user; 
    const code = req.body.verificationCode.code;

    const response = await verifyUser({
        email: email,
        token: code,
        type: "signup"
    });

    if(response.error) {
        req.error = response.error;

        next();
    } else {
        res.status(201).json(response);

        insertData<UsersSchema>("users", { id, first_name, last_name, email });
    }
}

export async function requestPasswordReset(req: any, res: any, next: Function) {
    const { email } = req.body;
    
    if(!(await checkEmailExists(email))) {
        req.error = { code: "email_invalid" };

        next();
        
        return;
    }

    dotenv.config();

    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false,
            emailRedirectTo: process.env.DOMAIN + "auth/password/reset"
        }
    });
    console.log(data);

    if(error) {
        console.log(error); // error is logged for now, handle appropriately on occurence since you'll have more information about it
    } else {
        res.status(201).json({
            data: data
        });
    }
}

async function updateUser(newAttributes: UserAttributes) {
    const { data, error } = await supabase.auth.updateUser(newAttributes);

    if(error) {
        console.log(error); // error is logged for now, handle appropriately on occurence since you'll have more information about it
    }

    return { authData: data, authError: error };
}

export async function changePassword(req: any, res: any, next: Function) {
    const { form, session } = req.body;
    const { data, error } = await supabase.auth.setSession({
        access_token: session.access_token!,
        refresh_token: session.refresh_token!
    });

    const { authData, authError } = await updateUser({ password: form.newPassword })
    
    if(authError) {
        req.error = authError;
        
        next();

        return;
    } else {
        res.status(201).json({
            message: "Password updated successfully.",
            session: authData
        });
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
import { supabase, insertRecord } from "./supabaseClient";
import * as dotenv from "dotenv";
import React from "react";

import type { RegistrationForm } from "../types/forms";
import type { UsersSchema } from "../types/tableSchemas";
import type { VerifyOtpParams, UserAttributes } from "@supabase/auth-js";

type AuthCredentials = {
    email: string,
    password: string,
}

/**
 * Attempts to log a user in using an email and a password.
 * 
 * @param req - a request from the client containing their email and password.
 * @param res - a response that holds the session of the user on a successful attempt.
 * @param next - an error-handling function.
 */
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
    
    const { id } = data.user;
    const { session } = data;

    res.send({ user_id: id, session }); 
}

/**
 * Verifies that there is no other user that has the same email.
 * 
 * @param providedEmail - the email provided during registration.
 * @returns a boolean value representing representing whether such a user exists.
 */
export async function checkEmailExists(providedEmail: string): Promise<boolean> {
    const { count, error } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("email", providedEmail);

    return count == 1;
}

/**
 * Attempts to register a user in the system.
 * 
 * @param req - a request from the client containing their full name, email, and password.
 * @param res - a response that holds the user's information to be added in the database.
 * @param next - an error handling function.
 */
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
    } 
    
    const id: string = data.user!.id;
    const [ first_name, last_name ] = fullName.split(" ");

    res.status(201).json({ 
        message: "User account created. Verification needed.", 
        user: { id, first_name, last_name, email }
    });
}

/**
 * Attempts to verify a user's account using an One Time Password (OTP).
 * 
 * @param params - the parameters appropriate to the verification type being used.
 * @returns a new session.
 */
async function verifyUser(params: VerifyOtpParams) {
    const { data, error } = await supabase.auth.verifyOtp(params);

    if(error) {
        return { error: error };
    } 
    
    return {
        message: "Account verified",
        session: data.session
    };
}

/**
 * Attempts to verify a new user with the OTP received after registration.
 * 
 * @param req - a request containing the information the user used on registration and the verification code they provided.
 * @param res - a response that holds the user's session on a successful attempt.
 * @param next - an error-handling function.
 */
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

        insertRecord<UsersSchema>("users", { id, first_name, last_name, email });
    }
}

/**
 * Sends an email to the user that will provide them with a link they can use to reset their password.
 * 
 * @param req - a request containing the email that should receive the reset link.
 * @param res - a response that holds information about the user's session.
 * @param next - an error-handling function.
 */
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

    if(error) {
        console.log(error); // error is logged for now, handle appropriately on occurence since you'll have more information about it
    } else {
        res.status(201).json({
            data: data
        });
    }
}

/**
 * Update the user's information.
 * 
 * @param newAttributes - an object that indicates the attribute to be updated and its new value.
 */
async function updateUser(newAttributes: UserAttributes) {
    const { data, error } = await supabase.auth.updateUser(newAttributes);

    if(error) {
        console.log(error); // error is logged for now, handle appropriately on occurence since you'll have more information about it
    }

    return { authData: data, authError: error };
}

/**
 * Changes the user's password.
 * 
 * @param req - a request containing the user's new password.
 * @param res - a response with a new session.
 * @param next - an error-handling function.
 */
export async function changePassword(req: any, res: any, next: Function) {
    const { form, session } = req.body;
    
    await supabase.auth.setSession({
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
            message: "Your password has been updated successfully.",
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
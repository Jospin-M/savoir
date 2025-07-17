"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = logInUser;
exports.checkEmailExists = checkEmailExists;
exports.signUpNewUser = signUpNewUser;
exports.verifyNewUser = verifyNewUser;
exports.requestPasswordReset = requestPasswordReset;
exports.changePassword = changePassword;
exports.getProfile = getProfile;
exports.signOut = signOut;
const supabaseClient_1 = require("./supabaseClient");
const dotenv = __importStar(require("dotenv"));
/**
 * Attempts to log a user in using an email and a password.
 *
 * @param req - a request from the client containing their email and password.
 * @param res - a response that holds the session of the user on a successful attempt.
 * @param next - an error-handling function.
 */
function logInUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { data, error } = yield supabaseClient_1.supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) {
            req.error = error;
            next();
            return;
        }
        const { id } = data.user;
        const { session } = data;
        res.send({ user_id: id, session });
    });
}
/**
 * Verifies that there is no other user that has the same email.
 *
 * @param providedEmail - the email provided during registration.
 * @returns a boolean value representing representing whether such a user exists.
 */
function checkEmailExists(providedEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count, error } = yield supabaseClient_1.supabase
            .from("users")
            .select("*", { count: "exact", head: true })
            .eq("email", providedEmail);
        return count == 1;
    });
}
/**
 * Attempts to register a user in the system.
 *
 * @param req - a request from the client containing their full name, email, and password.
 * @param res - a response that holds the user's information to be added in the database.
 * @param next - an error handling function.
 */
function signUpNewUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fullName, email, password } = req.body;
        if (yield checkEmailExists(email)) {
            req.error = { code: "email_exists" };
            next();
            return;
        }
        const { data, error } = yield supabaseClient_1.supabase.auth.signUp({
            email: email,
            password: password
        });
        if (error) {
            req.error = error;
            next();
            return;
        }
        const id = data.user.id;
        const [first_name, last_name] = fullName.split(" ");
        res.status(201).json({
            message: "User account created. Verification needed.",
            user: { id, first_name, last_name, email }
        });
    });
}
/**
 * Attempts to verify a user's account using an One Time Password (OTP).
 *
 * @param params - the parameters appropriate to the verification type being used.
 * @returns a new session.
 */
function verifyUser(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseClient_1.supabase.auth.verifyOtp(params);
        if (error) {
            return { error: error };
        }
        return {
            message: "Account verified",
            session: data.session
        };
    });
}
/**
 * Attempts to verify a new user with the OTP received after registration.
 *
 * @param req - a request containing the information the user used on registration and the verification code they provided.
 * @param res - a response that holds the user's session on a successful attempt.
 * @param next - an error-handling function.
 */
function verifyNewUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, first_name, last_name, email } = req.body.verificationRequest.user;
        const code = req.body.verificationCode.code;
        const response = yield verifyUser({
            email: email,
            token: code,
            type: "signup"
        });
        if (response.error) {
            req.error = response.error;
            next();
        }
        else {
            res.status(201).json(response);
            (0, supabaseClient_1.insertRecord)("users", { id, first_name, last_name, email });
        }
    });
}
/**
 * Sends an email to the user that will provide them with a link they can use to reset their password.
 *
 * @param req - a request containing the email that should receive the reset link.
 * @param res - a response that holds information about the user's session.
 * @param next - an error-handling function.
 */
function requestPasswordReset(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        if (!(yield checkEmailExists(email))) {
            req.error = { code: "email_invalid" };
            next();
            return;
        }
        dotenv.config();
        const { data, error } = yield supabaseClient_1.supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: false,
                emailRedirectTo: process.env.DOMAIN + "auth/password/reset"
            }
        });
        if (error) {
            console.log(error); // error is logged for now, handle appropriately on occurence since you'll have more information about it
        }
        else {
            res.status(201).json({
                data: data
            });
        }
    });
}
/**
 * Update the user's information.
 *
 * @param newAttributes - an object that indicates the attribute to be updated and its new value.
 */
function updateUser(newAttributes) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseClient_1.supabase.auth.updateUser(newAttributes);
        if (error) {
            console.log(error); // error is logged for now, handle appropriately on occurence since you'll have more information about it
        }
        return { authData: data, authError: error };
    });
}
/**
 * Changes the user's password.
 *
 * @param req - a request containing the user's new password.
 * @param res - a response with a new session.
 * @param next - an error-handling function.
 */
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { form, session } = req.body;
        yield supabaseClient_1.supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token
        });
        const { authData, authError } = yield updateUser({ password: form.newPassword });
        if (authError) {
            req.error = authError;
            next();
            return;
        }
        else {
            res.status(201).json({
                message: "Your password has been updated successfully.",
                session: authData
            });
        }
    });
}
/**
 * Retrieves the profile of a user.
 *
 * @param req - a request containing the id of the user whose profile will be retrieved
 * @param res - a response with the user's profile information
 */
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = req.params.id;
        const supabaseClient = (0, supabaseClient_1.createAuthenticatedClient)(req.headers);
        const { data, error } = yield supabaseClient
            .from("users")
            .select("first_name,last_name,bio,profile_image_url")
            .eq("id", userID)
            .maybeSingle();
        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({ error: "Failed to fetch user profile" });
        }
        const { first_name, last_name, bio, profile_image_url } = data;
        res.status(201).json({
            fullName: first_name + " " + last_name,
            bio: bio,
            profileImageUrl: profile_image_url
        });
    });
}
function signOut() {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = yield supabaseClient_1.supabase.auth.signOut();
        if (error) {
            console.error("There was an error signing out: ", error);
        }
    });
}

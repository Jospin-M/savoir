"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = logInUser;
exports.checkEmailExists = checkEmailExists;
exports.signUpNewUser = signUpNewUser;
exports.verifyNewUser = verifyNewUser;
exports.requestPasswordReset = requestPasswordReset;
exports.changePassword = changePassword;
exports.signOut = signOut;
exports.updateSession = updateSession;
var supabaseClient_1 = require("./supabaseClient");
var dotenv = require("dotenv");
function logInUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, _b, data, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, supabaseClient_1.supabase.auth.signInWithPassword({
                            email: email,
                            password: password
                        })];
                case 1:
                    _b = _c.sent(), data = _b.data, error = _b.error;
                    if (error) {
                        req.error = error;
                        next();
                        return [2 /*return*/];
                    }
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    });
}
function checkEmailExists(providedEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, count, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabaseClient_1.supabase
                        .from("users")
                        .select("*", { count: "exact", head: true })
                        .eq("email", providedEmail)];
                case 1:
                    _a = _b.sent(), count = _a.count, error = _a.error;
                    return [2 /*return*/, count == 1];
            }
        });
    });
}
function signUpNewUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, fullName, email, password, _b, _c, _d, _e, data, error, id, _f, first_name, last_name;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _a = req.body, fullName = _a.fullName, email = _a.email, password = _a.password;
                    _c = (_b = console).log;
                    _d = [email];
                    return [4 /*yield*/, checkEmailExists(email)];
                case 1:
                    _c.apply(_b, _d.concat([_g.sent()]));
                    return [4 /*yield*/, checkEmailExists(email)];
                case 2:
                    if (_g.sent()) {
                        req.error = { code: "email_exists" };
                        next();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, supabaseClient_1.supabase.auth.signUp({
                            email: email,
                            password: password
                        })];
                case 3:
                    _e = _g.sent(), data = _e.data, error = _e.error;
                    if (error) {
                        req.error = error;
                        next();
                        return [2 /*return*/];
                    }
                    else {
                        id = data.user.id;
                        _f = fullName.split(" "), first_name = _f[0], last_name = _f[1];
                        res.status(201).json({
                            message: "User account created. Verification needed.",
                            user: { id: id, first_name: first_name, last_name: last_name, email: email }
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function verifyUser(params) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabaseClient_1.supabase.auth.verifyOtp(params)];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        return [2 /*return*/, { error: error }];
                    }
                    else {
                        return [2 /*return*/, {
                                message: "Account verified",
                                session: data.session
                            }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function verifyNewUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, first_name, last_name, email, code, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body.verificationRequest.user, id = _a.id, first_name = _a.first_name, last_name = _a.last_name, email = _a.email;
                    code = req.body.verificationCode.code;
                    return [4 /*yield*/, verifyUser({
                            email: email,
                            token: code,
                            type: "signup"
                        })];
                case 1:
                    response = _b.sent();
                    if (response.error) {
                        req.error = response.error;
                        next();
                    }
                    else {
                        res.status(201).json(response);
                        (0, supabaseClient_1.insertData)("users", { id: id, first_name: first_name, last_name: last_name, email: email });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function requestPasswordReset(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    email = req.body.email;
                    return [4 /*yield*/, checkEmailExists(email)];
                case 1:
                    if (!(_b.sent())) {
                        req.error = { code: "email_invalid" };
                        next();
                        return [2 /*return*/];
                    }
                    dotenv.config();
                    return [4 /*yield*/, supabaseClient_1.supabase.auth.signInWithOtp({
                            email: email,
                            options: {
                                shouldCreateUser: false,
                                emailRedirectTo: process.env.DOMAIN + "auth/password/reset"
                            }
                        })];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    console.log(data);
                    if (error) {
                        console.log(error); // error is logged for now, handle appropriately on occurence since you'll have more information about it
                    }
                    else {
                        res.status(201).json({
                            data: data
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateUser(newAttributes) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabaseClient_1.supabase.auth.updateUser(newAttributes)];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.log(error); // error is logged for now, handle appropriately on occurence since you'll have more information about it
                    }
                    return [2 /*return*/, { authData: data, authError: error }];
            }
        });
    });
}
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, form, session, _b, data, error, _c, authData, authError;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = req.body, form = _a.form, session = _a.session;
                    return [4 /*yield*/, supabaseClient_1.supabase.auth.setSession({
                            access_token: session.access_token,
                            refresh_token: session.refresh_token
                        })];
                case 1:
                    _b = _d.sent(), data = _b.data, error = _b.error;
                    return [4 /*yield*/, updateUser({ password: form.newPassword })];
                case 2:
                    _c = _d.sent(), authData = _c.authData, authError = _c.authError;
                    if (authError) {
                        req.error = authError;
                        next();
                        return [2 /*return*/];
                    }
                    else {
                        res.status(201).json({
                            message: "Password updated successfully.",
                            session: authData
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function signOut() {
    return __awaiter(this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supabaseClient_1.supabase.auth.signOut()];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error("There was an error signing out: ", error);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateSession(setSession) {
    supabaseClient_1.supabase.auth.getSession().then(function (_a) {
        var session = _a.data.session;
        setSession(session); // might not be necessary, wait until more features have been implemented to decide
    });
    supabaseClient_1.supabase.auth.onAuthStateChange(function (_event, session) {
        if (session) {
            setSession(session);
        } // maybe default to no session if no valid one is found
    });
}

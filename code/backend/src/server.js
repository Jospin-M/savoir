"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var cors = require("cors");
var authRoutes_1 = require("./routes/authRoutes");
var PORT = 3000;
app.use(cors());
app.use(express.json());
// research other headers to add
// add middleware to log each HTTP request
app.use(function (req, res, next) {
    console.log("middle");
    /**
     * (client-side approach)
     * save session to React context
     * useEffect will check for token expiration and ( refresh access token, if neccessary )
     * update the session object to hold the new access token
     *
     * -- each request that is made to the server will automatically include the access token as one of its fields,
     * -- so that the server can perform the desired action using the information of the client that
     * -- sent the request
     */
    next();
});
app.use("/api/auth/", authRoutes_1.default);
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});

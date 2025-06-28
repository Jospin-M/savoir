const express = require("express");
const app = express();
const cors = require("cors");

import router from "./routes/authRoutes"

const PORT = 3000;

app.use(cors());
app.use(express.json());
// research other headers to add
// add middleware to log each HTTP request
app.use((req: any, res: any, next: Function) => {
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
});

app.use("/api/auth/", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
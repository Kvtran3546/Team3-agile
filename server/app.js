// Setup server, session and middleware here.
const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const configRoutes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ credentials: true,
    origin: 'http://localhost:5173'
   }));

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string',
    resave: false,
    saveUninitialized: true
}));

app.use(async (req, res, next) => {
    let string = new Date().toUTCString() + " " + req.method + " " + req.originalUrl;
    if (req.session.user){
       string = string + " Authenticated User";
    } else{
        string = string+ " Non-Authenticated User";
    }
    console.log(string);
    next();
})

// app.use("/protected", (req, res, next) =>{
//     if (!req.session.user){
//         res.status(403).json({ error: 'Not logged in' });
//         return;
//     } else{
//         next();
//     }
// });

configRoutes(app);

app.listen(3000, () =>{
    console.log("Server is now running");
});
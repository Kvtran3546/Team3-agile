
const users = require("./users");
const listings = require("./listings");
const constructorMethod = (app) => {
    app.use("/", users);
    app.use("/register", users);
    app.use("/login", users);
    app.use("/logout", users);
    app.use("/submitspot", listings);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
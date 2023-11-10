
const routes = require("./users");

const constructorMethod = (app) => {
    app.use("/", routes);
    app.use("/register", routes);
    app.use("/login", routes);
    app.use("/logout", routes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
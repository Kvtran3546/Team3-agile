
const usersRoutes = require("./users");
const listingsRoutes = require("./listings");
const express = require("express");

const constructorMethod = (app) => {
    app.use("/listings", listingsRoutes); // Assuming routes in listingsRoutes start with '/'
    app.use("/users", usersRoutes);       // Assuming routes in usersRoutes start with '/'

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
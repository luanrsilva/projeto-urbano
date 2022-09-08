const loginController = require("../routers/login.controller");
// const logoutController = require("../routers/logout.controller");
const sectorController = require("../routers/sector.controller");
const cityController = require("../routers/city.controller");
const propertyController = require("../routers/property.controller");

module.exports = (app) => {
    app.use("/api/login", loginController);
// app.use("/api/logout", logoutController);
    app.use("/api/sector", sectorController);
    app.use("/api/city", cityController);
    app.use("/api/property", propertyController);
}
"use strict";
exports.__esModule = true;
var express = require("express");
var controllers_1 = require("./controllers");
// import middlewares from './middlewares';
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.useControllers(controllers_1["default"]);
        // this.useMiddlewares(middlewares);
        this.start(5000);
    }
    App.main = function () {
        var app = new App();
    };
    App.prototype.useControllers = function (controllers) {
        this.app.use(controllers);
    };
    App.prototype.useMiddlewares = function (middlewares) {
        this.app.use(middlewares);
    };
    App.prototype.start = function (port) {
        if (port === void 0) { port = 5000; }
        this.app.listen(port, function () {
            console.log("Servidor funcionando na porta :" + port);
        });
    };
    return App;
}());
App.main();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
var port = 4001;
app.use(body_parser_1.default.json());
app.post("/test", function (req, res) {
    res.send("app works");
});
app.listen(port, function () { return console.log("App ready and listening on port " + port); });

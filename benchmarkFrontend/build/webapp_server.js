"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const node_path_1 = __importDefault(require("node:path"));
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["self", "localhost:8080"],
    },
}));
app.use((0, morgan_1.default)("dev"));
const p = node_path_1.default.dirname(__dirname).concat("/dist");
app.use("/games", (req, res, next) => {
    res.redirect("/");
    next();
});
app.use("/components", (req, res, next) => {
    res.redirect("/");
    next();
});
app.use("/", express_1.default.static(p));
app.listen(3002, () => {
    console.log("Listening on 3002");
});

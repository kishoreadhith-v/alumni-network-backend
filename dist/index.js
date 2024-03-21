"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
const server = http_1.default.createServer(app);
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const MONGO_URI = process.env.MONGO_URI;
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URI);
mongoose_1.default.connection.on("error", (error) => {
    console.log("MongoDB connection error: " + error);
    process.exit(-1);
});
mongoose_1.default.connection.on("connected", () => {
    console.log("MongoDB connected");
});
app.use("/", (0, router_1.default)());
//# sourceMappingURL=index.js.map
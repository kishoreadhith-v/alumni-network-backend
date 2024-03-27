"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
exports.default = (router) => {
    router.get("/users/:rollNumber", users_1.getUserByRoll);
    router.get("/usercount", users_1.getUsersCount);
    router.post("/createUser", users_1.createUserorUpdate);
};
//# sourceMappingURL=users.js.map
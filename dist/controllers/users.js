"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersCount = exports.getUserByRoll = void 0;
const user_1 = require("../db/user");
const getUserByRoll = async (req, res) => {
    try {
        const { rollNumber } = req.params;
        const user = await (0, user_1.getUserByRollNumber)(rollNumber);
        if (!user) {
            res.json({ message: "User not found" });
        }
        else {
            res.json(user);
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};
exports.getUserByRoll = getUserByRoll;
const getUsersCount = async (req, res) => {
    try {
        const count = await (0, user_1.getUserCount)();
        res.json({ count });
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};
exports.getUsersCount = getUsersCount;
//# sourceMappingURL=users.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserorUpdate = exports.getUsersCount = exports.getUserByRoll = void 0;
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
const createUserorUpdate = async (req, res) => {
    try {
        let body = req.body;
        body["alumniId"] = body.completionYear + "A" + body.rollNumber;
        const user = await (0, user_1.getUserByRollNumber)(body.rollNumber);
        if (!user) {
            await (0, user_1.createUser)(body);
            res.json({ message: "User created successfully" });
        }
        else {
            await (0, user_1.updateUser)(body.alumniId, body);
            res.json({ message: "User updated successfully" });
        }
        ;
    }
    catch (error) {
    }
};
exports.createUserorUpdate = createUserorUpdate;
//# sourceMappingURL=users.js.map
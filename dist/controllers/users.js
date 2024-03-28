"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserorUpdate = exports.getUsersCount = exports.getUserByRoll = void 0;
const user_1 = require("../db/user");
const getUserByRoll = async (req, res) => {
    try {
        const { rollNumber } = req.params;
        console.log(`rollNumber: ${rollNumber}`);
        const user = await (0, user_1.getUserByRollNumber)(rollNumber);
        console.log("user:", user);
        if (!user) {
            res.json({ success: false });
        }
        else {
            res.json({ success: true, user });
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
        console.log("request body:", body);
        body["alumniId"] = body.completionYear + "A" + body.rollNumber;
        const user = await (0, user_1.getUserByRollNumber)(body.rollNumber);
        if (!user) {
            await (0, user_1.createUser)(body);
            res
                .status(200)
                .json({
                message: "User created successfully",
                alumniId: body.alumniId,
                name: body.name,
                rollNumber: body.rollNumber,
                programmeName: body.programmeName,
                completionYear: body.completionYear,
            });
        }
        else {
            await (0, user_1.updateUser)(body.alumniId, body);
            res.status(201).json({
                message: "User updated successfully",
                alumniId: body.alumniId,
                name: body.name,
                rollNumber: body.rollNumber,
                programmeName: body.programmeName,
                completionYear: body.completionYear,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};
exports.createUserorUpdate = createUserorUpdate;
//# sourceMappingURL=users.js.map
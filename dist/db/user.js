"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserBySessionToken = exports.getUserByRollNumber = exports.getUserByAlumniId = exports.getUserByEmail = exports.getUserCount = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    alumniId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
    },
    programmeName: {
        type: String,
    },
    degreeName: {
        type: String,
    },
    batchYear: {
        type: Number,
    },
    completionYear: {
        type: Number,
    },
    addressLine1: {
        type: String,
    },
    addressLine2: {
        type: String,
    },
    addressLine3: {
        type: String,
    },
    pincode: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    countryCode: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    status: {
        type: String,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        },
    },
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserCount = () => exports.UserModel.countDocuments();
exports.getUserCount = getUserCount;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserByAlumniId = (alumniId) => exports.UserModel.findOne({ alumniId });
exports.getUserByAlumniId = getUserByAlumniId;
const getUserByRollNumber = async (rollNumber) => {
    const user = await exports.UserModel.findOne({ rollNumber });
    return user;
};
exports.getUserByRollNumber = getUserByRollNumber;
const getUserBySessionToken = (sessionToken) => exports.UserModel.findOne({ "authentication.sessionToken": sessionToken });
exports.getUserBySessionToken = getUserBySessionToken;
const createUser = (values) => new exports.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const updateUser = (alumniID, values) => exports.UserModel.findOneAndUpdate({ alumniId: alumniID }, values).then((user) => user.toObject());
exports.updateUser = updateUser;
const deleteUser = (alumniId) => exports.UserModel.findOneAndDelete({ alumniId });
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map
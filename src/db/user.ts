import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserCount = () => UserModel.countDocuments();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByAlumniId = (alumniId: string) =>
  UserModel.findOne({ alumniId });
export const getUserByRollNumber = async (rollNumber: string) => {
  const user = await UserModel.findOne({ rollNumber });
  return user;
};
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const updateUser = (alumniID: string, values: Record<string, any>) =>
  UserModel.findOneAndUpdate({ alumniId: alumniID }, values).then((user) =>
    user.toObject()
  );
export const deleteUser = (alumniId: string) =>
  UserModel.findOneAndDelete({ alumniId });

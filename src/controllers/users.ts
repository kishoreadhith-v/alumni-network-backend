import express from "express";

import {
  getUserByRollNumber,
  getUserCount,
  createUser,
  updateUser,
} from "../db/user";

export const getUserByRoll = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { rollNumber } = req.params;
    console.log(`rollNumber: ${rollNumber}`);
    const user = await getUserByRollNumber(rollNumber);
    console.log('user:', user);
    if (!user) {
      res.json({ success: false });
    } else {
      res.json({ success: true, user });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
export const getUsersCount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const count = await getUserCount();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const createUserorUpdate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let body = req.body;
    console.log("request body:",body);
    body["alumniId"] = body.completionYear + "A" + body.rollNumber;
    const user = await getUserByRollNumber(body.rollNumber);
    if (!user) {
      await createUser(body);
      res.status(200).json({ message: "User created successfully" });
    } else {
      await updateUser(body.alumniId, body);
      res.status(201).json({ message: "User updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

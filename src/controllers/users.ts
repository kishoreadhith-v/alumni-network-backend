import express from "express";

import { getUserByRollNumber, getUserCount } from "../db/user";

export const getUserByRoll = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { rollNumber } = req.params;
    const user = await getUserByRollNumber(rollNumber);
    if (!user) {
      res.json({ message: "User not found" });
    } else {
      res.json(user);
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

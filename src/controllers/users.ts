import express from "express";

import { getUserByRollNumber, getUserCount,createUser } from "../db/user";

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

export const createUserorUpdate = async (req: express.Request, res: express.Response) => {
try {
  let body = req.body;
  body["alumniId"]=body.completionYear+"A"+body.rollNumber;
  const user = await getUserByRollNumber(body.rollNumber);
  if (!user) {
    await createUser(body);
    res.json({ message: "User created successfully" });
  }else{
     const user = await findOneAndUpdate({alumniId:body.alumniId},body);
      res.json({ message: "User updated successfully" });
  };
} catch (error) {
  
}
};
function findOneAndUpdate(arg0: { alumniId: any; }, body: any) {
  throw new Error("Function not implemented.");
}


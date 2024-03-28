import express from "express";

import { createUserorUpdate, getUsersCount, getUserByRoll } from "../controllers/users";

export default (router: express.Router) => {
    router.get("/users/:rollNumber", getUserByRoll);
    router.get("/usercount", getUsersCount);
    router.post("/createUser",createUserorUpdate);
};

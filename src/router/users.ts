import express from "express";

import { createUserorUpdate, getUserByRoll, getUsersCount } from "../controllers/users";

export default (router: express.Router) => {
    router.get("/users/:rollNumber", getUserByRoll);
    router.get("/usercount", getUsersCount);
    router.post("/createUser",createUserorUpdate);
};

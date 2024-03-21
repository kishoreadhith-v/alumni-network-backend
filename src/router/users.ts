import express from "express";

import { getUserByRoll, getUsersCount } from "../controllers/users";

export default (router: express.Router) => {
    router.get("/users/:rollNumber", getUserByRoll);
    router.get("/usercount", getUsersCount);
};

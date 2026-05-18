import express from "express";
import { registerUser, loginUser } from "./users.controller.js";

export const usersRouter = express.Router();

usersRouter.post("/users/register", registerUser);
usersRouter.post("/users/login", loginUser);
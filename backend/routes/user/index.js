import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import express from 'express';
import getApplications from "./get-applications.js";
import getMeta from "./get-meta.js";
import postApplications from "./post-applications.js";

const UserRouter = express.Router();

UserRouter.use(ClerkExpressRequireAuth());
UserRouter.use("/", getApplications);
UserRouter.use("/", postApplications);
UserRouter.use("/", getMeta);


export default UserRouter;
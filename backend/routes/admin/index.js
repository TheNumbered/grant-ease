import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import express from 'express';
import ManageUsers from "./manage-users.js";
const AdminRouter = express.Router();

AdminRouter.use(ClerkExpressRequireAuth());
AdminRouter.use("/", ManageUsers)

export default AdminRouter;
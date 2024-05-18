import express from 'express';
import AdminRouter from './admin/index.js';
import BaseRouter from './base/index.js';
import ManagerRouter from './manager/index.js';
import UserRouter from './user/index.js';

const MainRouter = express.Router();
MainRouter.use("/", BaseRouter);
MainRouter.use("/admin", AdminRouter);
MainRouter.use("/manager", ManagerRouter);
MainRouter.use("/user", UserRouter);
export default MainRouter;
import express from 'express';
import GetFundingOpportunities from './get-funding-opportunites.js';
import GetNotifications from './get-notifications.js';
import GetRoot from './get-root.js';
import PostNotification from "./post-notification.js";
const BaseRouter = express.Router();

BaseRouter.use('/', GetRoot);
BaseRouter.use('/', GetNotifications);
BaseRouter.use('/', GetFundingOpportunities);
BaseRouter.use('/', GetNotifications);
BaseRouter.use('/', PostNotification);

export default BaseRouter;
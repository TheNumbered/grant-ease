import express from 'express';
import GetFundingOpportunities from './get-funding-opportunites.js';
import GetNotifications from './get-notifications.js';
import GetRoot from './get-root.js';
const BaseRouter = express.Router();

BaseRouter.use('/', GetRoot);
BaseRouter.use('/', GetFundingOpportunities);
BaseRouter.use('/', GetNotifications);

export default BaseRouter;
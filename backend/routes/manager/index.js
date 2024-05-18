import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import express from 'express';
import GetApplications from './applications.js';
import Balance from './balance.js';
import CreateFundingOpportunity from './create-funding-opportunity.js';
import GetFundingOpportunities from './get-funding-opportunities.js';

const ManagerRouter = express.Router();
ManagerRouter.use(ClerkExpressRequireAuth());

ManagerRouter.use('/', CreateFundingOpportunity);
ManagerRouter.use('/', GetApplications);
ManagerRouter.use('/', GetFundingOpportunities);
ManagerRouter.use('/', Balance);


export default ManagerRouter;
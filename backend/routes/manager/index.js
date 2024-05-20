// import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import express from 'express';
import GetApplications from './applications.js';
import Balance from './balance.js';
import CreateFundingOpportunity from './create-funding-opportunity.js';
import GetApprovedApplicants from './get-approved-applicants.js';
import GetFundAmounts from './get-fund-amounts.js';
import GetFundingBalance from './get-funding-balance.js';
import GetFundingOpportunities from './get-funding-opportunities.js';

const ManagerRouter = express.Router();
// ManagerRouter.use(ClerkExpressRequireAuth());

ManagerRouter.use('/', CreateFundingOpportunity);
ManagerRouter.use('/', GetApplications);
ManagerRouter.use('/', GetFundingOpportunities);
ManagerRouter.use('/', Balance);
ManagerRouter.use('/', GetFundAmounts);
ManagerRouter.use('/', GetFundingBalance);
ManagerRouter.use('/', GetApprovedApplicants);


export default ManagerRouter;
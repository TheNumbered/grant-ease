import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import GetApplications from "./applications.js";
import Balance from "./balance.js";
import CreateFundingOpportunity from "./create-funding-opportunity.js";
import FundingOpportunities from "./funding-opportunities.js";
import GetApprovedApplicants from "./get-approved-applicants.js";
import GetBalanceChange from "./get-balance-change.js";
import FundAmounts from "./get-fund-amounts.js";
import OverviewData from "./overview-data.js";

const ManagerRouter = express.Router();
ManagerRouter.use(ClerkExpressRequireAuth());

ManagerRouter.use("/", CreateFundingOpportunity);
ManagerRouter.use("/", GetApplications);
ManagerRouter.use("/", FundingOpportunities);
ManagerRouter.use("/", Balance);
ManagerRouter.use("/", GetApprovedApplicants);
ManagerRouter.use("/", OverviewData);
ManagerRouter.use("/", FundAmounts);
ManagerRouter.use("/", GetBalanceChange);

export default ManagerRouter;

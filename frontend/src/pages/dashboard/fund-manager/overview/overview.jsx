import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createMutation, getQuery } from "dataprovider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApprovedApplicantsBar } from "./charts/approved-applicants-bar";
import { BalanceLiquidChart } from "./charts/balance-liquid-chart";
import { FundAmountsPie } from "./charts/fund-amount-pie";

export function OverviewPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dialogInfo, setDialogInfo] = useState({ open: false , type: "", amount: 0});

  const { mutate: addBalance } = createMutation({
    resource: "manager/add-balance",
    invalidateKeys: ["manager/balance"],
  });

  const { mutate: deductBalance } = createMutation({
    resource: "manager/deduct-balance",
    invalidateKeys: ["manager/balance"],
  });

  const handleAmountChange = (event) => {
    setDialogInfo({ ...dialogInfo, amount: event.target.value });
  };

  const handleCloseDialog = () => {
    setDialogInfo({ open: false, type: "", amount: 0});
  };

  const submitChanges = () => {
    console.log(dialogInfo.type, dialogInfo.amount);
    if (dialogInfo.type === "add") {
      addBalance({ amount: dialogInfo.amount });
    } else {
      deductBalance({ amount: dialogInfo.amount });
    }
    handleCloseDialog();
  };

  const { data : balanceData, isErrorBalance, isLoadingBalance } = getQuery("manager/balance");
  const { data : overviewData, isError, isLoading } = getQuery("manager/overview-data");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  const balance = balanceData?.balance ?? 0;
  const currentlyFunding = overviewData?.currentlyFunding ?? 0;
  const unattendedApplications = overviewData?.unattendedApplications ?? 0;
  const totalApplications = overviewData?.totalApplications ?? 0;
  const totalFundingOpportunities = overviewData?.totalFundingOpportunities ?? 0;

  return (
    <>
    <article className="card-area">
      <section className="card-row">
        <article className="card graph-card">
          <h3>Funds You've Offered</h3>
          <small>Budgeting And Fund Disbursement</small>
          <section className="graph-area">
            <FundAmountsPie/>
          </section>
        </article>
        <article className="card-group">
          <section style={{ direction: "flex", display: "flex" }}>
            <article className="card">
              <section
                className="icon-area"
                style={{ backgroundColor: theme.palette.primary.main }}
              >
                <i>
                  {" "}
                  <PriceChangeIcon />{" "}
                </i>
              </section>
              <h3>Total Applicants Received</h3>
              <big>{totalApplications}</big>
            </article>
            <article className="card">
              <section
                className="icon-area"
                style={{ backgroundColor: theme.palette.primary.main }}
              >
                <i>
                  <CurrencyExchangeIcon />
                </i>
              </section>
              <h3>Total Open Fund Ads</h3>
              <big>{totalFundingOpportunities}</big>
            </article>
          </section>
          <article className="card" style={{ height: "17rem" }}>
            <h3>Total Balance</h3>
            <big>R{balance}</big>
            <Stack
              component="section"
              className="action-area"
              direction="row"
              spacing={2}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDialogInfo({ open: true, type: "add" });
                }}
              >
                Add Money
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setDialogInfo({ open: true, type: "deduct" });
                }}
              >
                Withdraw
              </Button>
            </Stack>
          </article>
        </article>
        <article
          className="stacked-cards card-group"
          style={{
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.secondary.light,
          }}
        >
          <button
            className="action-button"
            onClick={() => {
              navigate("/create-funding");
            }}
          >
            <i className="card-icon-area">+</i>
            <h3>Create New Funding Ad</h3>
          </button>
          <section
            style={{
              borderTop: "4px solid",
              borderBottom: "4px solid",
              borderColor: "#fffcf1",
            }}
          >
            <h3>Currently Funding</h3>
            <big>{currentlyFunding}</big>
          </section>
          <section>
            <h3>Unattended Applications</h3>
            <big>{unattendedApplications}</big>
          </section>
        </article>
      </section>

      {/* Dialog for adding money or withdrawing */}
      <Dialog open={dialogInfo.open} onClose={handleCloseDialog}>
        <DialogTitle>{"Enter Amount to" + (dialogInfo.type === "add" ? " Add" : " Withdraw")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={dialogInfo.amount}
            onChange={handleAmountChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={submitChanges}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </article>
    <article className="card-area d-flex">
        <section className="single-analytic-card card">
          <><ApprovedApplicantsBar/></>
        </section>
        <section className="single-analytic-card card">
          <><BalanceLiquidChart/></>
        </section>
    </article>
    </>
  );
}

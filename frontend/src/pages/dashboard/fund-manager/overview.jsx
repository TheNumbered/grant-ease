import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMutation, getQuery } from "../../../dataprovider";
import { BarAnimation } from "./bar-graph";
import { Basic } from "./line-graph";
import { PieArcLabel } from "./pie-chart";

export default function FundManagerOverviewCards() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [amount, setAmount] = useState(0);

  const { mutate: updateBalance } = createMutation({
    resource: "manager/add-balance",
    invalidateKeys: ["manager/balance"],
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const submitChanges = () => {
    updateBalance({ amount: amount });
    handleCloseDialog();
  };


  const { data, isError, isLoading } = getQuery("manager/balance");

  // Use getQuery to get the number of applicants
  const {
    data: numApplicants,
    isError: errorApplicants,
    isLoading: loadingApplicants,
  } = getQuery("manager/get-num-applicants");

  // Check if both data and numApplicants are defined
  const isDataLoaded =
    !isLoading && !loadingApplicants && data && numApplicants;
  
  if(!isDataLoaded){
    return <p>Loading...</p>
  }

  if(isError || errorApplicants){
    return <p>Error</p>
  }

  const numApplicant = numApplicants[0].num_applicants;
  let balance = data[0].balance;

  return (
    <article className="card-area">
      <section className="card-row">
        <article className="card graph-card">
          <h3>History</h3>
          <small>Jan 21/2024 - Now</small>
          <p className="card-title">Funds You've Offered</p>
          <section className="graph-area">
            <PieArcLabel />

          </section>
          <section className="graph-area">
            
            <BarAnimation/>
          </section>

          <section className="graph-area">
            
            <Basic/>
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
              <big>{numApplicant}</big>
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
              <big>11</big>
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
                onClick={handleOpenDialog}
              >
                Add Money
              </Button>
              {/* <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenDialog}
              >
                Withdraw
              </Button> */}
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
            <big>21</big>
          </section>
          <section>
            <h3>Unattended Applications</h3>
            <big>4</big>
          </section>
        </article>
      </section>

      {/* Dialog for adding money or withdrawing */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Enter Amount"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={submitChanges}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </article>
  );
}

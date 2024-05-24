import { Grid, Typography } from "@mui/material";
import { FundingUserAppliedToTable } from "./applied-funding-table";
import "./user-dashboard-styles.css";


export const UserDashboard = () => {
  return (
    <>
      <Grid
        component={"section"}
        container
        spacing={3}
        style={{ marginTop: "1rem" }}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FundingUserAppliedToTable />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <article className="card text-center notifications-area">
            <h2></h2>
            <Typography
              variant="h5"
              component="div"
              align="center"
              gutterBottom
            >
              
            </Typography>
          </article>
        </Grid>
      </Grid>
    </>
  );
};

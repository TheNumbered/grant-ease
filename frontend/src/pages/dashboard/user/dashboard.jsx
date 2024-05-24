import { Grid } from "@mui/material";
import { ApplyForManager } from "./apply-for-manager";
import { UserApplications } from "./user-applications";

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
          <UserApplications />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ApplyForManager />
        </Grid>
      </Grid>
    </>
  );
};

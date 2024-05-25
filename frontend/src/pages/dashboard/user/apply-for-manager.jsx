import { Button, Typography } from "@mui/material";
import { createMutation, getQuery } from "dataprovider";
import { useNavigate } from "react-router-dom";

export const ApplyForManager = () => {
  const {data} = getQuery("user/meta");
  const { mutate: applyForManager } = createMutation({
    resource: "user/apply-fund-manager",
    invalidateKeys: ["user/meta"],
  });
  
  const { mutate: notify } = createMutation({resource: "notify"});

  const currentRole = data?.role;
  const navigate = useNavigate();

  const renderContent = () => {
    if (currentRole === "fund_manager") {
      return (
        <>
          <Typography
            variant="body1"
            component="p"
            align="center"
            gutterBottom
          >
            You are already a fund manager. Click the button below to go to your dashboard.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: "1rem" }}
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </>
      );
    } else if (currentRole === "fund_manager_pending") {
      return (
        <>
          <Typography
            variant="body1"
            component="p"
            align="center"
            gutterBottom
          >
            Your application to be a fund manager is pending. Please wait for approval.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: "1rem" }}
            disabled
          >
            Application Pending
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Typography
            variant="body1"
            component="p"
            align="center"
            gutterBottom
          >
            You can apply to be a fund manager by clicking the button below. Once you have applied and your application has been approved, you will be able to manage your own funds.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              applyForManager({});
              notify({"type": "fund manager role request"});
            }}
          >
            Apply Now
          </Button>
        </>
      );
    }
  };

  return (
    <article className="card text-center">
      <h2>Apply To Be A Fund Manager</h2>
      {renderContent()}
    </article>
  );
};

import { Button, Typography } from "@mui/material";

export const ApplyForManager = () => {
  return (
    <article className="card text-center">
      <h2>Apply To Be A Fund Manager</h2>
      <Typography
        variant="body1"
        component="p"
        align="center"
        gutterBottom
      >
        You can apply to be a fund manager by clicking the button below,
        once you have applied and your application has been approved, you
        will be able to manage your own funds.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: "1rem" }}
      >
        Apply Now
      </Button>

    </article>
  );
};

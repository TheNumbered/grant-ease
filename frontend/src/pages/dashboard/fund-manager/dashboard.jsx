import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import "./fund-manager-styles.css";
import { ManagerFundingAdvertisements } from "./get-manager-funding-advertisements.jsx";
import FundManagerOverviewCards from "./overview";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const FundManagerDashboard = ({ data, applicants }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <section
        className="page-heading-section"
        style={{ marginBottom: "2rem" }}
      >
        <h1 style={{ margin: "0" }}>Fund Manager Dashboard</h1>
        <small>Welcome Back!</small>
      </section>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="My Fund Ads" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <FundManagerOverviewCards data={data} applicants={applicants} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* <ManageApplications /> */}
          <ManagerFundingAdvertisements />
        </CustomTabPanel>
      </Box>
    </>
  );
};

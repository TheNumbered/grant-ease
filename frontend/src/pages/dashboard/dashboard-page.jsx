import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { getQuery } from "dataprovider";
import React from "react";
import { LoadingPage } from "../loading-page";
import ManageUsers from "./admin/manage-users";
import RoleChangeRequest from "./admin/role-change-request";
import { AdvertsPage, OverviewPage } from "./fund-manager";
import { UserDashboard } from "./user/dashboard";

function CustomTabPanel({ children, value, index, ...other }) {
  
    return (
      <section
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ paddingTop: "1rem" }}
      >
        {children}
      </section>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }


export const DashboardPage = () => {
    const { data, isError, isLoading } = getQuery('user/meta');
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    if (isLoading) {
        return <LoadingPage/>
    };
    if (isError) {
        Navigate("/error");
    };

    
    
    return(
        <>
            <section
                className="page-heading-section"
                style={{ marginBottom: "2rem" }}
            >
                <h1 style={{ margin: "0" }}>Dashboard</h1>
                <small>Welcome Back!</small>
            </section>
                
            {(() => {
                if (data.role === "fund_manager") {
                    return (
                        <>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                            >
                                <Tab label="Funds Overview" {...a11yProps(0)} />
                                <Tab label="My Fund Ads" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <OverviewPage/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <AdvertsPage/>
                        </CustomTabPanel>
                        </>
                    );
                } else if(data.role === "admin"){
                    return (
                        <>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                >
                                <Tab label="Manager Users" {...a11yProps(0)} />
                                <Tab label="New Fund Managers" {...a11yProps(1)} />
                                <Tab label="Funds Overview" {...a11yProps(2)} />
                                <Tab label="My Fund Ads" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <ManageUsers />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <RoleChangeRequest />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <OverviewPage />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <AdvertsPage/>
                        </CustomTabPanel>
                        </>
                    );
                }
                else{
                    return(<UserDashboard />);
                }
            })()}
                
        </>
    )
}
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApplications } from "../pages/user-applications/applications";

export default function ProfileMenu({ user, onClose, onSignOut }) {
  const [applicationsOpen, setApplicationsOpen] = useState(false);

  const handleApplicationsClose = () => {
    setApplicationsOpen(false);
  };

  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div>
      <Menu
        id="profile-menu"
        anchorEl={user ? user.anchorEl : null}
        open={Boolean(user)}
        onClose={onClose}
      >
        <MenuItem onClick={handleProfile}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {user && user.imageUrl ? (
              <Avatar src={user.imageUrl} alt="User Avatar" sx={{ mr: 1 }} />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  mr: 1,
                }}
              >
                <AccountCircleIcon />
              </Avatar>
            )}
            <div>
              <Typography variant="subtitle1">
                {user && user.fullName}
              </Typography>
              {user && user.emailAddresses[0].emailAddress ? (
                <Typography variant="body2" color="textSecondary">
                  {user.emailAddresses[0].emailAddress}
                </Typography>
              ) : null}
            </div>
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/user-applications");
          }}
        >
          Applications
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
      </Menu>
      {/* Wrap the Applications component inside a parent element */}
      <div>
        <Menu
          id="applications-menu"
          anchorEl={user ? user.anchorEl : null}
          open={applicationsOpen}
          onClose={handleApplicationsClose}
        >
          {applicationsOpen && (
            <UserApplications onClose={handleApplicationsClose} />
          )}
        </Menu>
      </div>
    </div>
  );
}

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ user, onClose, onSignOut }) {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
    onClose();
  }

  return (
    <div>
      <Menu
        id="profile-menu"
        anchorEl={user ? user.anchorEl : null}
        open={Boolean(user)}
        onClose={onClose}
      >
        <MenuItem onClick={() => handleClick("/profile")}>
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
        <MenuItem onClick={() => handleClick("/")}>
          Home
        </MenuItem>
        <MenuItem onClick={() => handleClick("/applications")}>
          Applications
        </MenuItem>
        <MenuItem onClick={() => handleClick("/dashboard")}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
}

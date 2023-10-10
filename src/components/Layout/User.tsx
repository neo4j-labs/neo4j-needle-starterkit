import { Box, Avatar } from "@mui/material";
import React, {useState} from "react";
import { Menu, Typography, IconButton } from "@neo4j-ndl/react";
import { ChevronDownIconOutline } from "@neo4j-ndl/react/icons";

const settings = ["Profile", "Logout"];

export default function User() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuSelect = (e: string) => {
    window.alert(e)
    handleClose();
  }

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: "flex" }}>
      <Avatar alt="John Doe" src="/static/images/avatar/johndoe.jpg" 
        sx={{
            display: { xs: "none", md: "flex" },
            padding: 2,
            mr: "16px",
          }}/>

      <Box sx={{ display: { xs: "none", md: "grid" }, flexGrow: 1 }}>
        <Typography
          variant="body-large"
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mt: "32px",
            padding: 2,
          }}
        >
          John Doe
        </Typography>

        <Typography
          variant="body-small"
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mt: "32px",
            padding: 2,
          }}
        >
          john.doe@neo4j.com
        </Typography>

        <Menu
          style={{ marginTop: "18px" }}
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Menu.Items>
            {settings.map((setting) => (
              <Menu.Item key={setting} onClick={() => menuSelect(setting)} title={setting} />
            ))}
          </Menu.Items>
        </Menu>
      </Box>
      <Typography
        variant="body-small"
        component="a"
        href="#app-bar-with-responsive-menu" >
        <IconButton
          style={{ float: "right", marginRight: "10px", color: "white" }}
          aria-label="settings"
          clean
          onClick={handleClick} open={open}
        >
          <ChevronDownIconOutline />
        </IconButton>
      </Typography>
    </Box>
  );
}

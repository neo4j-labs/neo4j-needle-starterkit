import React from "react";
import Neo4jLogo from "../../logo.svg";
import { ThemeWrapperContext } from "../../context/ThemeWrapper";
import User from "./User";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  useTheme,
  Container,
} from "@mui/material";
import {
  MoonIconOutline,
  SunIconOutline,
  Cog8ToothIconOutline
} from "@neo4j-ndl/react/icons";
import { Typography } from "@neo4j-ndl/react";

export default function Header() {
  const theme = useTheme();
  const themeUtils = React.useContext(ThemeWrapperContext);

  const toolbarStyle = {};

  return (
    <AppBar position="static">
      <Container maxWidth="100vh" sx={{ margin: 0 }}>
        <Toolbar style={toolbarStyle} disableGutters>
          <Typography
            variant="h6"
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{}}
          >
            <img
              src={Neo4jLogo}
              style={{ minHeight: "32px", minWidth: "32px" }}
              alt="Neo4j Logo"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <Typography variant="h6">Quick Starter</Typography>
          </Box>

          <Box sx={{ display: "flex", flexGrow: 0 }}>
            <User />

            <Typography
              variant="subheading-large"
              style={{
                ml: "var(--space-8)",
                mr: "var(--space-8)",
                width: "1px",
                height: "var(--space-16)",
                backgroundColor: "white",
              }}
            ></Typography>

            <IconButton
              sx={{ ml: "16px", fontSize: "1rem" }}
              onClick={themeUtils.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <span role="img" aria-label="sun">
                  <SunIconOutline className="n-w-6 n-h-6" />
                </span>
              ) : (
                <span role="img" aria-label="moon">
                  <MoonIconOutline className="n-w-6 n-h-6" />
                </span>
              )}
            </IconButton>

            <IconButton sx={{ ml: "16px", fontSize: "1rem" }} color="inherit">
              <span role="img" aria-label="settings">
                <Cog8ToothIconOutline className="n-w-6 n-h-6" />
              </span>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

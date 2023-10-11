import React from "react";
import Neo4jLogoBW from "../../logo.svg";
import Neo4jLogoColor from "../../logo-color.svg";
import { ThemeWrapperContext } from "../../context/ThemeWrapper";
import User from "./User";
import { AppBar, Box, Toolbar, useTheme, Container } from "@mui/material";
import {
  MoonIconOutline,
  SunIconOutline,
  Cog8ToothIconOutline,
} from "@neo4j-ndl/react/icons";
import { Typography, IconButton } from "@neo4j-ndl/react";

export default function Header() {
  const theme = useTheme();
  const themeUtils = React.useContext(ThemeWrapperContext);

  const toolbarStyle = {};

  return (
    <AppBar position="static" color="inherit" sx={{
        borderBottom: "1px solid rgb(var(--theme-palette-neutral-border-weak))",
    }}>
      <Container maxWidth="100vh" sx={{ margin: 0 }}>
        <Toolbar style={toolbarStyle} disableGutters>
          <Typography
            variant="h6"
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{}}
          >
            <img
              src={theme.palette.mode==="dark" ? Neo4jLogoBW : Neo4jLogoColor}
              style={{ height: "32px", minHeight: "32px", minWidth: "32px" }}
              alt="Neo4j Logo"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <Typography variant="h6">Quick Starter</Typography>
          </Box>

          <Box sx={{ display: "flex", flexGrow: 0, alignItems:"center", gap: "4px" }}>
            <IconButton clean size="large" onClick={themeUtils.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <span role="img" aria-label="sun">
                  <SunIconOutline />
                </span>
              ) : (
                <span role="img" aria-label="moon">
                  <MoonIconOutline />
                </span>
              )}
            </IconButton>

            <IconButton size="large" clean aria-label="settings">
              <Cog8ToothIconOutline />
            </IconButton>

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

            <User />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

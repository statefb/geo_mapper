import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useDrawer from "../hooks/useDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const AppBarMain: React.FC = () => {
  const { showDrawer } = useDrawer();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={showDrawer}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Geo Location Mapper
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AppBarMain;

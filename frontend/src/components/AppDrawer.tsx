import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import useDrawer from "../hooks/useDrawer";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

const AppDrawer = () => {
  const { isShowDrawer, hideDrawer } = useDrawer();

  return (
    <Drawer anchor="left" open={isShowDrawer} onClose={hideDrawer}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={hideDrawer}
        onKeyDown={hideDrawer}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <StickyNote2Icon></StickyNote2Icon>
            </ListItemIcon>
            <ListItemText primary="side menu 1"></ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
export default AppDrawer;

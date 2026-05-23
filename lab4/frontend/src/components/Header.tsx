import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { title: "Главная", path: "/" },
  { title: "Таблица", path: "/table" },
  { title: "Графики", path: "/charts" },
  { title: "Тест", path: "/quiz" },
  { title: "CRUD", path: "/crud" },
];

function Header() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const closeDrawer = () => setOpen(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          Страница со скинами
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  variant={isActive ? "outlined" : "text"}
                  sx={{
                    borderColor: "rgba(255,255,255,0.7)",
                  }}
                >
                  {item.title}
                </Button>
              );
            })}
          </Box>
        )}

        {isMobile && (
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <Box sx={{ width: 260, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={closeDrawer}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <List>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.path}
                  component={Link}
                  to={item.path}
                  selected={isActive}
                  onClick={closeDrawer}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;
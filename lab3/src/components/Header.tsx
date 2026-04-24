import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Главная", path: "/" },
  { title: "Таблица", path: "/table" },
  { title: "Графики", path: "/charts" },
  { title: "Тест", path: "/quiz" },
];

function Header() {
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ background: "#303030", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "center", minHeight: "50px !important", p: 0 }}>
        <Box sx={{ display: "flex", height: 50 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 0,
                  px: 3,
                  color: "white",
                  borderLeft: "1px solid #777",
                  background: isActive ? "#422566" : "transparent",
                  "&:hover": {
                    background: isActive ? "#552F82" : "#444",
                  },
                }}
              >
                {item.title}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
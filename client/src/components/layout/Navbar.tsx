import { useState } from "react";
import { NavLink } from "react-router";
import { AppBar, Box, Button, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const links = [
  { to: "/", label: "Начало" },
  { to: "/map", label: "Карта" },
  { to: "/routes", label: "Нощни разходки" },
  { to: "/submit", label: "Предложи легенда" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--ink-border)" }}
    >
      <Toolbar className="mx-auto w-full max-w-6xl">
        <NavLink to="/" className="font-heading text-xl font-semibold text-ink-text no-underline">
          Легендите на София
        </NavLink>

        <Box sx={{ flexGrow: 1 }} />

        {}
        <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
          {links.map((link) => (
            <Button key={link.to} component={NavLink} to={link.to} end={link.to === "/"} color="inherit" className="nav-link">
              {link.label}
            </Button>
          ))}
          <Button component={NavLink} to="/login" variant="contained">
            Вход
          </Button>
        </Box>

        {}
        <IconButton sx={{ display: { md: "none" } }} onClick={() => setMenuOpen(true)} aria-label="Отвори менюто">
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <List sx={{ width: 260 }} component="nav">
          {[...links, { to: "/login", label: "Вход" }].map((link) => (
            <ListItemButton
              key={link.to}
              component={NavLink}
              to={link.to}
              end={link.to === "/"}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
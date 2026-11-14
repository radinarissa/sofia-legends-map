import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuth from "../../hooks/auth/useAuth";

const links = [
  { to: "/", label: "Начало" },
  { to: "/map", label: "Карта" },
  { to: "/routes", label: "Нощни разходки" },
  { to: "/submit", label: "Предложи легенда" },
];

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleLogout = () => {
    logout();
    setMenuAnchor(null);
    setDrawerOpen(false);
    navigate("/");
  };

  const mobileLinks = [
    ...links,
    ...(isAuthenticated
      ? [{ to: "/profile", label: "Моят профил" }, ...(isAdmin ? [{ to: "/admin", label: "Модерация" }] : [])]
      : [
          { to: "/login", label: "Вход" },
          { to: "/register", label: "Регистрация" },
        ]),
  ];

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

          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                startIcon={<AccountCircleIcon />}
                onClick={(event) => setMenuAnchor(event.currentTarget)}
                aria-controls={menuAnchor ? "user-menu" : undefined}
                aria-haspopup="true"
              >
                {user?.name}
              </Button>
              <Menu id="user-menu" anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                <MenuItem component={Link} to="/profile" onClick={() => setMenuAnchor(null)}>
                  Моят профил
                </MenuItem>
                {isAdmin && (
                  <MenuItem component={Link} to="/admin" onClick={() => setMenuAnchor(null)}>
                    Модерация
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleLogout}>Изход</MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={NavLink} to="/login" variant="contained">
              Вход
            </Button>
          )}
        </Box>

        {}
        <IconButton sx={{ display: { md: "none" } }} onClick={() => setDrawerOpen(true)} aria-label="Отвори менюто">
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 260 }} component="nav">
          {isAuthenticated && (
            <>
              <p className="m-0 px-4 py-3 text-sm text-ink-muted">Здравейте, {user?.name}</p>
              <Divider />
            </>
          )}
          {mobileLinks.map((link) => (
            <ListItemButton
              key={link.to}
              component={NavLink}
              to={link.to}
              end={link.to === "/"}
              className="nav-link"
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
          {isAuthenticated && (
            <>
              <Divider />
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Изход" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}
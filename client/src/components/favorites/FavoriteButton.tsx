import { useLocation, useNavigate } from "react-router";
import { Button, IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../../hooks/auth/useAuth";
import useAddFavorite from "../../hooks/favorites/useAddFavorite";
import useRemoveFavorite from "../../hooks/favorites/useRemoveFavorite";

interface FavoriteButtonProps {
  legendId: string;
  withLabel?: boolean; 
  className?: string;
}

export default function FavoriteButton({ legendId, withLabel = false, className }: FavoriteButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorite = user?.favorites.includes(legendId) ?? false;
  const isPending = addFavorite.isPending || removeFavorite.isPending;
  const label = isFavorite ? "Премахни от любими" : "Добави в любими";

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname + location.search } });
      return;
    }
    if (isPending) return; 

    if (isFavorite) {
      removeFavorite.mutate(legendId);
    } else {
      addFavorite.mutate(legendId);
    }
  };

  if (withLabel) {
    return (
      <Button
        onClick={handleClick}
        variant={isFavorite ? "contained" : "outlined"}
        startIcon={<FavoriteIcon />}
        aria-pressed={isFavorite}
        className={className}
      >
        {isFavorite ? "В любими" : "Добави в любими"}
      </Button>
    );
  }

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={handleClick}
        aria-label={label}
        aria-pressed={isFavorite}
        className={className}
        sx={{
          color: isFavorite ? "var(--ink-accent)" : "var(--ink-muted)",
          bgcolor: "var(--ink-surface)",
          "&:hover": { bgcolor: "var(--ink-surface)" },
        }}
      >
        <FavoriteIcon />
      </IconButton>
    </Tooltip>
  );
}
import { useLocation, useNavigate } from "react-router";
import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import useGetRandomLegend from "../../hooks/legends/useGetRandomLegend";

interface SurpriseButtonProps {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}

export default function SurpriseButton({ variant = "outlined", size = "large" }: SurpriseButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentSlug = location.pathname.startsWith("/legends/") ? location.pathname.split("/")[2] : undefined;
  const { refetch, isFetching, isError } = useGetRandomLegend(currentSlug);

  const handleClick = async () => {
    const result = await refetch(); 
    if (result.data) {
      navigate(`/legends/${result.data.slug}`);
    }
  };

  return (
    <span className="inline-flex flex-col gap-1">
      <Button variant={variant} size={size} startIcon={<ShuffleIcon />} onClick={handleClick} disabled={isFetching}>
        {isFetching ? "Избираме..." : "Изненадай ме"}
      </Button>
      {isError && <span className="text-sm text-red-700">Не успяхме да изберем легенда. Опитайте пак.</span>}
    </span>
  );
}
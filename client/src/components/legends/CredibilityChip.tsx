import { Chip } from "@mui/material";
import type { Credibility } from "../../types/legend";
import { CREDIBILITY_LABELS } from "../../constants/labels";

const COLORS: Record<Credibility, "success" | "warning" | "default"> = {
  confirmed: "success",
  partial: "warning",
  legend: "default",
};

interface CredibilityChipProps {
  value: Credibility;
}

export default function CredibilityChip({ value }: CredibilityChipProps) {
  return <Chip label={CREDIBILITY_LABELS[value]} color={COLORS[value]} size="small" variant="outlined" />;
}
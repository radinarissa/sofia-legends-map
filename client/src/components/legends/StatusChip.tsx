import { Chip } from "@mui/material";
import type { LegendStatus } from "../../types/legend";

const STATUS_CONFIG: Record<LegendStatus, { label: string; color: "warning" | "success" | "error" }> = {
  pending: { label: "Чака преглед", color: "warning" },
  approved: { label: "Одобрена", color: "success" },
  rejected: { label: "Отказана", color: "error" },
};

interface StatusChipProps {
  status: LegendStatus;
}

export default function StatusChip({ status }: StatusChipProps) {
  const { label, color } = STATUS_CONFIG[status];
  return <Chip label={label} color={color} size="small" variant="outlined" />;
}
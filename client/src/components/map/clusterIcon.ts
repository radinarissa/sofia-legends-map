import L from "leaflet";

interface ClusterWithCount {
  getChildCount(): number;
}

export function createClusterIcon(cluster: ClusterWithCount) {
  const count = cluster.getChildCount();
  const size = count < 5 ? 36 : count < 10 ? 42 : 48;

  return L.divIcon({
    className: "legend-cluster",
    html: `<span>${count}</span>`,
    iconSize: L.point(size, size),
  });
}
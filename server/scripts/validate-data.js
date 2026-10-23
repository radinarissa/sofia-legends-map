const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const legends = JSON.parse(fs.readFileSync(path.join(dataDir, "legends.json"), "utf-8"));
const routes = JSON.parse(fs.readFileSync(path.join(dataDir, "routes.json"), "utf-8"));

const ALLOWED = {
  category: ["ghosts", "tunnels", "curses", "mysteries", "myths"],
  era: ["ancient", "medieval", "ottoman", "kingdom", "socialism", "modern"],
  credibility: ["confirmed", "partial", "legend"],
};
const REQUIRED_TEXT = ["slug", "title", "shortDescription", "fullStory", "address", "district"];

const errors = [];
const slugs = new Set();

legends.forEach((legend, i) => {
  const name = legend.slug || `легенда №${i + 1}`;

  REQUIRED_TEXT.forEach((field) => {
    if (typeof legend[field] !== "string" || legend[field].trim() === "") {
      errors.push(`${name}: липсва или е празно полето "${field}"`);
    }
  });

  if (legend.slug && !/^[a-z0-9-]+$/.test(legend.slug)) {
    errors.push(`${name}: slug трябва да е само с малки латински букви, цифри и тирета`);
  }
  if (slugs.has(legend.slug)) {
    errors.push(`${name}: този slug се повтаря`);
  }
  slugs.add(legend.slug);

  Object.entries(ALLOWED).forEach(([field, values]) => {
    if (!values.includes(legend[field])) {
      errors.push(`${name}: "${field}" е "${legend[field]}", а трябва да е едно от: ${values.join(", ")}`);
    }
  });

  if (!Number.isInteger(legend.scariness) || legend.scariness < 1 || legend.scariness > 5) {
    errors.push(`${name}: scariness трябва да е цяло число от 1 до 5`);
  }

  if (!(legend.lat > 42.4 && legend.lat < 42.85 && legend.lng > 23.1 && legend.lng < 23.55)) {
    errors.push(`${name}: координатите (${legend.lat}, ${legend.lng}) са извън София`);
  }

  if (!Array.isArray(legend.sources) || legend.sources.length === 0) {
    errors.push(`${name}: трябва да има поне един източник`);
  } else {
    legend.sources.forEach((s) => {
      if (!s.title || !/^https?:\/\//.test(s.url || "")) {
        errors.push(`${name}: източникът "${s.title}" няма заглавие или валиден линк`);
      }
    });
  }
});

routes.forEach((route) => {
  if (!Array.isArray(route.legends) || route.legends.length < 2) {
    errors.push(`маршрут ${route.slug}: трябва да има поне 2 легенди`);
    return;
  }
  route.legends.forEach((slug) => {
    if (!slugs.has(slug)) {
      errors.push(`маршрут ${route.slug}: няма легенда със slug "${slug}"`);
    }
  });
});

if (errors.length > 0) {
  console.log(`Намерени са ${errors.length} грешки:\n`);
  errors.forEach((e) => console.log(" - " + e));
  process.exit(1);
}
console.log(`Всичко е наред: ${legends.length} легенди и ${routes.length} маршрута.`);
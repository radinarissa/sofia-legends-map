const BG_TO_LATIN = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
  ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sht", ъ: "a", ь: "y", ю: "yu", я: "ya",
};

function slugify(text) {
  const latin = String(text)
    .toLowerCase()
    .split("")
    .map((char) => BG_TO_LATIN[char] ?? char)
    .join("");

  const slug = latin
    .replace(/[^a-z0-9]+/g, "-") 
    .slice(0, 80)
    .replace(/^-+|-+$/g, ""); 

  return slug || "legenda";
}

async function uniqueSlug(Model, text) {
  const base = slugify(text);
  let slug = base;
  let counter = 2;
  while (await Model.exists({ slug })) {
    slug = `${base}-${counter}`;
    counter++;
  }
  return slug;
}

module.exports = { slugify, uniqueSlug };
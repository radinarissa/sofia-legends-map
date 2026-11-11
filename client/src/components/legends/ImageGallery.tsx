import { useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { LegendImage } from "../../types/legend";

interface ImageGalleryProps {
  images: LegendImage[];
  title: string;
}

function credit(image: LegendImage): string {
  return [image.author && `Автор: ${image.author}`, image.license].filter(Boolean).join(" · ");
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const current = openIndex !== null ? images[openIndex] : null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="m-0 text-xl font-semibold">Снимки</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <figure key={image.url} className="m-0 flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group cursor-pointer overflow-hidden rounded-ink border-0 bg-transparent p-0"
              aria-label={`Увеличи снимка ${index + 1}`}
            >
              <img
                src={image.url}
                alt={`${title}, снимка ${index + 1}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
              />
            </button>
            <figcaption className="text-xs text-ink-muted">{credit(image)}</figcaption>
          </figure>
        ))}
      </div>

      {}
      <Dialog open={current !== null} onClose={() => setOpenIndex(null)} maxWidth="lg">
        {current && (
          <figure className="relative m-0">
            <IconButton
              onClick={() => setOpenIndex(null)}
              aria-label="Затвори"
              sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(255,255,255,0.85)" }}
            >
              <CloseIcon />
            </IconButton>
            <img src={current.url} alt={title} className="block max-h-[80vh] w-full object-contain" />
            <figcaption className="px-4 py-3 text-sm text-ink-muted">{credit(current)}</figcaption>
          </figure>
        )}
      </Dialog>
    </section>
  );
}
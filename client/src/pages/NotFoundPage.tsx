import { Link } from "react-router";
import { Button } from "@mui/material";

export default function NotFoundPage() {
  return (
    <section className="ink-card mx-auto max-w-xl px-6 py-12 text-center">
      <p className="font-heading text-7xl font-semibold text-ink-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold">Тази легенда не съществува</h1>
      <p className="mt-3 text-ink-muted">
        Адресът, който търсите, е изчезнал безследно. Като тайното общество в тунелите, само че без пълнолуние.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button component={Link} to="/" variant="contained">
          Към началото
        </Button>
        <Button component={Link} to="/map" variant="outlined">
          Отвори картата
        </Button>
      </div>
    </section>
  );
}
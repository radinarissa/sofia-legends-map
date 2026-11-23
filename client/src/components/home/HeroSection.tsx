import { Link } from "react-router";
import { Button } from "@mui/material";
import useGetLegends from "../../hooks/legends/useGetLegends";
import useGetRoutes from "../../hooks/routes/useGetRoutes";

export default function HeroSection() {
  const { data: legends } = useGetLegends();
  const { data: walks } = useGetRoutes();

  return (
    <section className="flex flex-col gap-6 pt-4 md:pt-10">
      <p className="m-0 text-sm font-semibold uppercase tracking-[0.18em] text-ink-accent">
        Карта на градските легенди
      </p>

      <h1 className="m-0 max-w-4xl text-5xl font-semibold leading-[1.05] md:text-7xl">Легендите на София</h1>

      <p className="m-0 max-w-2xl text-lg text-ink-muted md:text-xl">
        Тунели под властта, лъвове без езици и тайни врати в най-малката улица. Открийте историите, които
        софиянци си разказват от векове, и тръгнете по техните следи.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button component={Link} to="/map" variant="contained" size="large">
          Отвори картата
        </Button>
        <Button component={Link} to="/routes" variant="outlined" size="large">
          Нощни разходки
        </Button>
      </div>

      {legends && walks && (
        <p className="m-0 text-sm text-ink-muted">
          {legends.length} легенди · {walks.length} нощни разходки · от Сердика до днес
        </p>
      )}
    </section>
  );
}
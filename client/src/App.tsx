import { Button, Card, CardContent, Typography } from "@mui/material";

export default function App() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <Typography variant="h3" component="h1">Легендите на София</Typography>
      <Card className="mt-6">
        <CardContent>
          <Typography variant="h5" component="h2">MUI карта</Typography>
          <Typography color="text.secondary">Темата работи.</Typography>
          <Button variant="contained" className="mt-4">Акцентен бутон</Button>
        </CardContent>
      </Card>
    </div>
  );
}
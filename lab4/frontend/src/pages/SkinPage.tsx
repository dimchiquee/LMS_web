import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSkin } from "../api/api";
import { Skin } from "../api/types";

function SkinPage() {
  const { id } = useParams();
  const [skin, setSkin] = useState<Skin | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    getSkin(Number(id))
      .then(setSkin)
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Скин не найден</Typography>
        <Button component={Link} to="/" sx={{ mt: 2 }}>
          На главную
        </Button>
      </Container>
    );
  }

  if (!skin) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Загрузка...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <CardMedia
          component="img"
          image={skin.image}
          alt={skin.name}
          sx={{ width: { xs: "100%", md: 420 }, objectFit: "contain", p: 3 }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{skin.name}</Typography>
          <Typography><b>Оружие:</b> {skin.weapon}</Typography>
          <Typography><b>Тип:</b> {skin.weaponType}</Typography>
          <Typography><b>Редкость:</b> {skin.rarity}</Typography>
          <Typography><b>Коллекция:</b> {skin.collection}</Typography>
          <Typography><b>Цена:</b> ${skin.price}</Typography>
          <Typography><b>Износ:</b> {skin.wear}</Typography>
          <Typography><b>Год выпуска:</b> {skin.releaseYear}</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>{skin.description}</Typography>
          </Box>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
            Назад
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SkinPage;

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSkins } from "../api/api";
import { Skin } from "../api/types";

function HomePage() {
  const [skins, setSkins] = useState<Skin[]>([]);

  useEffect(() => {
    getSkins({ page: 1, perPage: 8 }).then((data) => setSkins(data.items));
  }, []);

  const topSkins = skins.slice(0, 6);
  const leftSkins = skins.slice(0, 4);
  const rightSkins = skins.slice(2, 6);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
          gap: "4px",
          mb: 2,
        }}
      >
        {topSkins.map((skin, index) => (
          <Paper
            key={skin.id}
            component={Link}
            to={`/skin/${skin.id}`}
            sx={{
              height: 120,
              gridColumn: { xs: "span 1", md: index === 0 || index === 5 ? "span 2" : "span 1" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              borderRadius: 0,
              overflow: "hidden",
              p: 1,
            }}
          >
            <Box component="img" src={skin.image} alt={skin.name} sx={{ maxHeight: 100, maxWidth: "100%", objectFit: "contain" }} />
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "140px 1fr 140px" }, gap: 3 }}>
        <Box>
          {leftSkins.map((skin) => (
            <Box key={skin.id} sx={{ textAlign: "center", mb: 3 }}>
              <Paper component={Link} to={`/skin/${skin.id}`} sx={{ width: 84, height: 74, mx: "auto", border: "2px solid #552F82", display: "flex", alignItems: "center", justifyContent: "center", p: 0.5 }}>
                <Box component="img" src={skin.image} alt={skin.name} sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </Paper>
              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>{skin.weapon}</Typography>
              <Typography sx={{ fontSize: 13 }}>Цена ${skin.price}</Typography>
            </Box>
          ))}
        </Box>

        <Box>
          <Paper sx={{ border: "1px solid #999", borderRadius: 0, p: 2, mb: 1.5 }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
              Предметная область
            </Typography>
            <Typography sx={{ lineHeight: 1.8 }}>
                В этом разделе отображается список игровых предметов Counter-Strike 2,
  загруженных из CSV-файла в базу данных. На странице таблицы можно просматривать
  скины, фильтровать данные, сортировать записи и переходить к подробной информации
  о выбранном предмете.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button component={Link} to="/table" variant="contained" size="small">Подробнее</Button>
            </Box>
          </Paper>

          <Paper sx={{ border: "1px solid #999", borderRadius: 0, p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
              Интерактивный тест
            </Typography>
            <Typography>
              В этом разделе находится интерактивный тест по теме игровых предметов CS2.
  Вопросы и варианты ответов загружаются из базы данных через Flask API,
  а результат рассчитывается на стороне клиента и не сохраняется в базе.
            </Typography>
            <Button component={Link} to="/quiz" variant="outlined" sx={{ mt: 2 }}>Пройти тест</Button>
          </Paper>
        </Box>

        <Box>
          {rightSkins.map((skin) => (
            <Box key={skin.id} sx={{ textAlign: "center", mb: 3 }}>
              <Paper component={Link} to={`/skin/${skin.id}`} sx={{ width: 84, height: 74, mx: "auto", border: "2px solid #552F82", display: "flex", alignItems: "center", justifyContent: "center", p: 0.5 }}>
                <Box component="img" src={skin.image} alt={skin.name} sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </Paper>
              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>{skin.weapon}</Typography>
              <Typography sx={{ fontSize: 13 }}>Цена ${skin.price}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;

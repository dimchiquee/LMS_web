import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { skins } from "../data/skinsData";

function HomePage() {
  const topSkins = skins.slice(0, 6);
  const leftSkins = skins.slice(0, 4);
  const rightSkins = skins.slice(2, 6);


  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(4, 1fr)",
          },
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
              gridColumn: {
                xs: "span 1",
                md: index === 0 || index === 5 ? "span 2" : "span 1",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              borderRadius: 0,
              overflow: "hidden",
              p: 1,
            }}
          >
            <Box
              component="img"
              src={skin.image}
              alt={skin.name}
              sx={{
                maxHeight: 100,
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "140px 1fr 140px",
          },
          gap: 3,
        }}
      >
        <Box>
          {leftSkins.map((skin, index) => (
            <Box key={skin.id} sx={{ textAlign: "center", mb: 3 }}>
              <Paper
                component={Link}
                to={`/skin/${skin.id}`}
                sx={{
                  width: 84,
                  height: 74,
                  mx: "auto",
                  border: "2px solid #552F82",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 0.5,
                }}
              >
                <Box
                  component="img"
                  src={skin.image}
                  alt={skin.name}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Paper>

              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                {skin.weapon}
              </Typography>

              <Typography sx={{ fontSize: 13 }}>Цена ${skin.price}</Typography>
            </Box>
          ))}
        </Box>

        <Box>
          <Paper
            sx={{
              border: "1px solid #999",
              borderRadius: 0,
              p: 2,
              mb: 1.5,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Последнее обновление
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "2fr 1fr",
                },
                gap: 3,
                alignItems: "start",
              }}
            >
              <Box>
                <Box
                  sx={{
                    columnCount: { xs: 1, md: 2 },
                    columnGap: 4,
                  }}
                >
                  <Typography sx={{ lineHeight: 1.8 }}>
                    В инвентари игроков в Германии и Нидерландах добавлена вкладка «Рентген-сканер». Теперь пользователи в этих странах могут открыть контейнеры только с помощью рентген-сканера, который поставляется с эксклюзивным P250 высшей пробы в раскраске «Рентген». Оружие нельзя обменять и нужно получить до того, как использовать сканер для просмотра содержимого других контейнеров.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                  }}
                >
                  <Button
                    component={Link}
                    to="/table"
                    variant="contained"
                    size="small"
                  >
                    Подробнее
                  </Button>
                </Box>
              </Box>

              <Paper
                sx={{
                  height: 180,
                  borderRadius: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={skins[1].image}
                  alt={skins[1].name}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Paper>
            </Box>
          </Paper>

          <Paper
            sx={{
              border: "1px solid #999",
              borderRadius: 0,
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Узнай свой игровой интеллект
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "220px 1fr",
                },
                gap: 3,
                alignItems: "center",
              }}
            >
              <Paper
                sx={{
                  height: 180,
                  background: "#fff",
                  borderRadius: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                }}
              >
                <Box
                  component="img"
                  src={skins[3].image}
                  alt={skins[3].name}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Paper>

              <Box>
                <Typography sx={{ lineHeight: 1.8 }}>
                  На сайте подготовлен интерактивный тест, направленный на проверку знаний о скинах в Counter-Strike 2. Тест включает вопросы разных типов: с выбором одного или нескольких вариантов ответа, задания на сопоставление, а также элементы с перетаскиванием для определения правильного порядка или соответствия.
                </Typography>

                <Button
                  component={Link}
                  to="/quiz"
                  variant="contained"
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Пройти тест
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box>
          {rightSkins.map((skin, index) => (
            <Box key={skin.id} sx={{ textAlign: "center", mb: 3 }}>
              <Paper
                component={Link}
                to={`/skin/${skin.id}`}
                sx={{
                  width: 84,
                  height: 74,
                  mx: "auto",
                  border: "2px solid #552F82",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 0.5,
                }}
              >
                <Box
                  component="img"
                  src={skin.image}
                  alt={skin.name}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Paper>

              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                {skin.weapon}
              </Typography>

              <Typography sx={{ fontSize: 13 }}>Цена ${skin.price}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
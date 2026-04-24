import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import { useState } from "react";
import { skins, Skin } from "../data/skinsData";

type GroupOption = {
  label: string;
  field: keyof Skin;
};

type SeriesState = {
  "Максимальная цена": boolean;
  "Средняя цена": boolean;
  "Минимальная цена": boolean;
};

type GroupRow = {
  id: number;
  group: string;
  "Минимальная цена": number;
  "Средняя цена": number;
  "Максимальная цена": number;
};

const groupOptions: GroupOption[] = [
  { label: "Редкость", field: "rarity" },
  { label: "Тип оружия", field: "weaponType" },
  { label: "Износ", field: "wear" },
  { label: "Источник получения", field: "source" },
  { label: "Год выпуска", field: "releaseYear" },
];

function groupSkinsBy(field: keyof Skin): GroupRow[] {
  const grouped = skins.reduce<Record<string, number[]>>((acc, skin) => {
    const key = String(skin[field]);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(skin.price);

    return acc;
  }, {});

  return Object.entries(grouped).map(([group, prices], index) => {
    const sum = prices.reduce((total, price) => total + price, 0);

    return {
      id: index + 1,
      group,
      "Минимальная цена": Math.min(...prices),
      "Средняя цена": Math.round(sum / prices.length),
      "Максимальная цена": Math.max(...prices),
    };
  });
}

function ChartsPage() {
  const [selectedGroup, setSelectedGroup] = useState<keyof Skin>("rarity");
  const [isBar, setIsBar] = useState(true);

  const [series, setSeries] = useState<SeriesState>({
    "Максимальная цена": true,
    "Средняя цена": false,
    "Минимальная цена": false,
  });

  const groupData = groupSkinsBy(selectedGroup);

  const selectedLabel =
    groupOptions.find((item) => item.field === selectedGroup)?.label || "";

  const selectedSeries = Object.entries(series)
    .filter(([, enabled]) => enabled)
    .map(([key]) => ({
      dataKey: key,
      label: key,
    }));

  const handleGroupChange = (event: SelectChangeEvent) => {
    setSelectedGroup(event.target.value as keyof Skin);
  };

  const handleChartTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(event.target.value === "bar");
  };

  const handleSeriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  const isSingleSeries = selectedSeries.length === 1;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Графики по сгруппированным данным
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <FormControl sx={{ minWidth: 260 }}>
          <InputLabel id="group-select-label">Группировать по</InputLabel>

          <Select
            labelId="group-select-label"
            value={String(selectedGroup)}
            label="Группировать по"
            onChange={handleGroupChange}
          >
            {groupOptions.map((option) => (
              <MenuItem key={String(option.field)} value={String(option.field)}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            mt: 3,
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          <FormControl>
            <FormLabel>Тип диаграммы:</FormLabel>

            <RadioGroup
              row
              value={isBar ? "bar" : "line"}
              onChange={handleChartTypeChange}
            >
              <FormControlLabel
                value="bar"
                control={<Radio />}
                label="Гистограмма"
              />
              <FormControlLabel
                value="line"
                control={<Radio />}
                label="Линейная"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>На диаграмме показать:</FormLabel>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Максимальная цена"
                    checked={series["Максимальная цена"]}
                    onChange={handleSeriesChange}
                  />
                }
                label="максимальную цену"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="Средняя цена"
                    checked={series["Средняя цена"]}
                    onChange={handleSeriesChange}
                  />
                }
                label="среднюю цену"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="Минимальная цена"
                    checked={series["Минимальная цена"]}
                    onChange={handleSeriesChange}
                  />
                }
                label="минимальную цену"
              />
            </Box>
          </FormControl>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Агрегация по полю: {selectedLabel}
        </Typography>

        {selectedSeries.length === 0 ? (
          <Typography color="text.secondary">
            Выберите хотя бы один показатель для отображения на диаграмме.
          </Typography>
        ) : isBar ? (
          <BarChart
            dataset={groupData}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "group",
                label: selectedLabel,
              },
            ]}
            yAxis={[
              {
                label: "Цена, $",
              },
            ]}
            series={selectedSeries.map((item) => ({
              ...item,
              ...(isSingleSeries && { barLabel: "value" }),
            }))}
            height={400}
            slotProps={{
              legend: {
                position: {
                  vertical: "bottom",
                  horizontal: "center",
                },
              },
            }}
          />
        ) : (
          <LineChart
            dataset={groupData}
            xAxis={[
              {
                scaleType: "point",
                dataKey: "group",
                label: selectedLabel,
              },
            ]}
            yAxis={[
              {
                label: "Цена, $",
              },
            ]}
            series={selectedSeries.map((item) => ({
              ...item,
              showMark: true,
            }))}
            height={400}
            slotProps={{
              legend: {
                position: {
                  vertical: "bottom",
                  horizontal: "center",
                },
              },
            }}
          />
        )}
      </Paper>
    </Container>
  );
}

export default ChartsPage;
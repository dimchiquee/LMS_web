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
import { useEffect, useState } from "react";
import { getGroupedSkins } from "../api/api";
import { GroupedSkinRow } from "../api/types";

type SeriesState = {
  maxPrice: boolean;
  avgPrice: boolean;
  minPrice: boolean;
};

const groupOptions = [
  { label: "Редкость", field: "rarity" },
  { label: "Тип оружия", field: "weaponType" },
  { label: "Износ", field: "wear" },
  { label: "Источник получения", field: "source" },
  { label: "Год выпуска", field: "releaseYear" },
];

const seriesLabels: Record<keyof SeriesState, string> = {
  maxPrice: "Максимальная цена",
  avgPrice: "Средняя цена",
  minPrice: "Минимальная цена",
};

function ChartsPage() {
  const [selectedGroup, setSelectedGroup] = useState("rarity");
  const [isBar, setIsBar] = useState(true);
  const [rows, setRows] = useState<GroupedSkinRow[]>([]);
  const [series, setSeries] = useState<SeriesState>({
    maxPrice: true,
    avgPrice: false,
    minPrice: false,
  });

  useEffect(() => {
    getGroupedSkins(selectedGroup).then(setRows);
  }, [selectedGroup]);

  const selectedLabel = groupOptions.find((item) => item.field === selectedGroup)?.label || "";
  const xLabels = rows.map((row) => row.group);
  const selectedSeries = (Object.keys(series) as Array<keyof SeriesState>)
    .filter((key) => series[key])
    .map((key) => ({
      label: seriesLabels[key],
      data: rows.map((row) => row[key]),
    }));

  const handleGroupChange = (event: SelectChangeEvent) => {
    setSelectedGroup(event.target.value);
  };

  const handleSeriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Графики по сгруппированным данным
      </Typography>

      <Paper sx={{ p: 3 }}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Группировать по</InputLabel>
          <Select value={selectedGroup} label="Группировать по" onChange={handleGroupChange}>
            {groupOptions.map((option) => (
              <MenuItem key={option.field} value={option.field}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4} sx={{ mt: 3 }}>
          <FormControl>
            <FormLabel>Тип диаграммы</FormLabel>
            <RadioGroup
              row
              value={isBar ? "bar" : "line"}
              onChange={(event) => setIsBar(event.target.value === "bar")}
            >
              <FormControlLabel value="bar" control={<Radio />} label="Гистограмма" />
              <FormControlLabel value="line" control={<Radio />} label="Линейная" />
            </RadioGroup>
          </FormControl>

          <Box>
            <Typography>Показатели:</Typography>
            {(Object.keys(series) as Array<keyof SeriesState>).map((key) => (
              <FormControlLabel
                key={key}
                control={<Checkbox checked={series[key]} name={key} onChange={handleSeriesChange} />}
                label={seriesLabels[key]}
              />
            ))}
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />
        <Typography sx={{ mb: 2 }}>Агрегация по полю: {selectedLabel}</Typography>

        {selectedSeries.length === 0 ? (
          <Typography>Выберите хотя бы один показатель для отображения на диаграмме.</Typography>
        ) : isBar ? (
          <BarChart
            xAxis={[{ scaleType: "band", data: xLabels }]}
            series={selectedSeries}
            height={400}
          />
        ) : (
          <LineChart
            xAxis={[{ scaleType: "point", data: xLabels }]}
            series={selectedSeries}
            height={400}
          />
        )}
      </Paper>
    </Container>
  );
}

export default ChartsPage;

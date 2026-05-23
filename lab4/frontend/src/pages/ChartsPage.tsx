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
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { BarChart, LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { getGroupedSkins, getSkins } from "../api/api";
import { GroupedSkinRow, Skin } from "../api/types";

type SeriesKey = "maxPrice" | "avgPrice" | "minPrice";

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

const seriesLabels: Record<SeriesKey, string> = {
  maxPrice: "Максимальная цена",
  avgPrice: "Средняя цена",
  minPrice: "Минимальная цена",
};

const tableColumns: GridColDef<Skin>[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Название", width: 230 },
  { field: "weapon", headerName: "Оружие", width: 140 },
  { field: "weaponType", headerName: "Тип", width: 150 },
  { field: "rarity", headerName: "Редкость", width: 150 },
  { field: "collection", headerName: "Коллекция", width: 220 },
  { field: "price", headerName: "Цена, $", width: 130, type: "number" },
  { field: "wear", headerName: "Износ", width: 150 },
  { field: "source", headerName: "Источник", width: 170 },
  { field: "releaseYear", headerName: "Год", width: 100, type: "number" },
];

function ChartsPage() {
  const [selectedGroup, setSelectedGroup] = useState("rarity");
  const [isBar, setIsBar] = useState(true);

  const [chartRows, setChartRows] = useState<GroupedSkinRow[]>([]);
  const [tableRows, setTableRows] = useState<Skin[]>([]);

  const [series, setSeries] = useState<SeriesState>({
    maxPrice: true,
    avgPrice: false,
    minPrice: false,
  });

  useEffect(() => {
    getGroupedSkins(selectedGroup).then(setChartRows);
  }, [selectedGroup]);

  useEffect(() => {
    getSkins({
      page: 1,
      perPage: 1000,
    }).then((data) => {
      setTableRows(data.items);
    });
  }, []);

  const selectedLabel =
    groupOptions.find((item) => item.field === selectedGroup)?.label || "";

  const xLabels = chartRows.map((row) => row.group);

  const selectedSeries = (Object.keys(series) as SeriesKey[])
    .filter((key) => series[key])
    .map((key) => ({
      label: seriesLabels[key],
      data: chartRows.map((row) => row[key]),
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
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Графики по сгруппированным данным
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>Группировать по</InputLabel>
            <Select
              value={selectedGroup}
              label="Группировать по"
              onChange={handleGroupChange}
            >
              {groupOptions.map((option) => (
                <MenuItem key={option.field} value={option.field}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Тип диаграммы</FormLabel>
            <RadioGroup
              row
              value={isBar ? "bar" : "line"}
              onChange={(event) => setIsBar(event.target.value === "bar")}
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

          <Box>
            <Typography sx={{ mb: 1 }}>Показатели:</Typography>

            {(Object.keys(series) as SeriesKey[]).map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={series[key]}
                    onChange={handleSeriesChange}
                    name={key}
                  />
                }
                label={seriesLabels[key]}
              />
            ))}
          </Box>

          <Divider />

          <Typography variant="h6">
            Агрегация по полю: {selectedLabel}
          </Typography>

          {selectedSeries.length === 0 ? (
            <Typography color="text.secondary">
              Выберите хотя бы один показатель для отображения на диаграмме.
            </Typography>
          ) : isBar ? (
            <BarChart
              height={380}
              xAxis={[
                {
                  scaleType: "band",
                  data: xLabels,
                },
              ]}
              series={selectedSeries}
            />
          ) : (
            <LineChart
              height={380}
              xAxis={[
                {
                  scaleType: "point",
                  data: xLabels,
                },
              ]}
              series={selectedSeries}
            />
          )}
        </Stack>
      </Paper>

      <Paper sx={{ height: 600, width: "100%", p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Таблица исходных данных
        </Typography>

        <DataGrid
          rows={tableRows}
          columns={tableColumns}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Container>
  );
}

export default ChartsPage;
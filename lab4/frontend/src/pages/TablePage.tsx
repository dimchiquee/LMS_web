import { Box, Container, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getSkins } from "../api/api";
import { Skin } from "../api/types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Название", width: 230 },
  { field: "weapon", headerName: "Оружие", width: 140 },
  { field: "weaponType", headerName: "Тип", width: 150 },
  { field: "rarity", headerName: "Редкость", width: 150 },
  { field: "collection", headerName: "Коллекция", width: 220 },
  { field: "price", headerName: "Цена, $", width: 130, type: "number" },
  { field: "wear", headerName: "Износ", width: 150 },
  { field: "releaseYear", headerName: "Год", width: 100, type: "number" },
];

function TablePage() {
  const [rows, setRows] = useState<Skin[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [rarity, setRarity] = useState("");
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSkins({
      page: page + 1,
      perPage: pageSize,
      search,
      rarity,
      sortBy: sortModel[0]?.field,
      sortOrder: sortModel[0]?.sort || "asc",
    })
      .then((data) => {
        setRows(data.items);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, search, rarity, sortModel]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Таблица скинов
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Поиск"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(0);
            }}
            size="small"
          />

          <TextField
            select
            label="Редкость"
            value={rarity}
            onChange={(event) => {
              setRarity(event.target.value);
              setPage(0);
            }}
            size="small"
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="Restricted">Restricted</MenuItem>
            <MenuItem value="Classified">Classified</MenuItem>
            <MenuItem value="Covert">Covert</MenuItem>
          </TextField>
        </Box>
      </Paper>

      <Paper sx={{ height: 620, p: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          rowCount={total}
          paginationMode="server"
          sortingMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[5, 10, 20]}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          slots={{ toolbar: GridToolbar }}
        />
      </Paper>
    </Container>
  );
}

export default TablePage;

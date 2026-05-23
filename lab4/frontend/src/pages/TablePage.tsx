import { Box, Container, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getSkins } from "../api/api";
import { Skin } from "../api/types";

const columns: GridColDef<Skin>[] = [
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

function TablePage() {
  const [rows, setRows] = useState<Skin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getSkins({
      page: 1,
      perPage: 1000,
    })
      .then((data) => {
        setRows(data.items);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Таблица скинов
        </Typography>

      </Box>

      <Paper sx={{ height: 650, width: "100%", p: 2 }}>
        <DataGrid
          showToolbar={true}
          rows={rows}
          columns={columns}
          loading={loading}
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

export default TablePage;
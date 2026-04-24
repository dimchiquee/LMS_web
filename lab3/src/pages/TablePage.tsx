import { Container, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { skins } from "../data/skinsData";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Название", width: 230 },
  { field: "weapon", headerName: "Оружие", width: 140 },
  { field: "rarity", headerName: "Редкость", width: 150 },
  { field: "collection", headerName: "Коллекция", width: 220 },
  { field: "price", headerName: "Цена, $", width: 130, type: "number" },
];

function TablePage() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Таблица скинов
      </Typography>

      <Paper sx={{ height: 520, width: "100%" }}>
        <DataGrid
        showToolbar={true}
          rows={skins}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
        />
      </Paper>
    </Container>
  );
}

export default TablePage;
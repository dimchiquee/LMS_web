import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { createSkin, deleteSkin, getSkins, updateSkin } from "../api/api";
import { Skin } from "../api/types";

type SkinForm = Omit<Skin, "id">;

const emptyForm: SkinForm = {
  name: "",
  weapon: "",
  weaponType: "",
  rarity: "",
  collection: "",
  price: 0,
  wear: "",
  source: "",
  releaseYear: 2024,
  image: "",
  description: "",
};

function CrudPage() {
  const [rows, setRows] = useState<Skin[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<SkinForm>(emptyForm);

  const loadRows = () => {
    getSkins({ page: page + 1, perPage: pageSize }).then((data) => {
      setRows(data.items);
      setTotal(data.total);
    });
  };

  useEffect(() => {
    loadRows();
  }, [page, pageSize]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const handleOpenEdit = (skin: Skin) => {
    setEditingId(skin.id);
    const { id, ...formData } = skin;
    setForm(formData);
    setOpen(true);
  };

  const handleSave = async () => {
    if (editingId) {
      await updateSkin(editingId, form);
    } else {
      await createSkin(form);
    }

    setOpen(false);
    loadRows();
  };

  const handleDelete = async (id: number) => {
    await deleteSkin(id);
    loadRows();
  };

  const handleChange = (field: keyof SkinForm, value: string) => {
    setForm({
      ...form,
      [field]: field === "price" || field === "releaseYear" ? Number(value) : value,
    });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Название", width: 220 },
    { field: "weapon", headerName: "Оружие", width: 130 },
    { field: "rarity", headerName: "Редкость", width: 150 },
    { field: "collection", headerName: "Коллекция", width: 220 },
    { field: "price", headerName: "Цена", width: 120, type: "number" },
    {
      field: "actions",
      type: "actions",
      headerName: "Действия",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Редактировать"
          onClick={() => handleOpenEdit(params.row as Skin)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Удалить"
          onClick={() => handleDelete(Number(params.id))}
        />,
      ],
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack
  direction="row"
  sx={{
    mb: 2,
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
        <Typography variant="h4">CRUD для таблицы skins</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>Добавить скин</Button>
      </Stack>

      <Paper sx={{ height: 620, p: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={total}
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingId ? "Редактирование скина" : "Добавление скина"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mt: 1 }}>
            <TextField label="Название" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            <TextField label="Оружие" value={form.weapon} onChange={(e) => handleChange("weapon", e.target.value)} />
            <TextField label="Тип оружия" value={form.weaponType} onChange={(e) => handleChange("weaponType", e.target.value)} />
            <TextField label="Редкость" value={form.rarity} onChange={(e) => handleChange("rarity", e.target.value)} />
            <TextField label="Коллекция" value={form.collection} onChange={(e) => handleChange("collection", e.target.value)} />
            <TextField label="Цена" type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} />
            <TextField label="Износ" value={form.wear} onChange={(e) => handleChange("wear", e.target.value)} />
            <TextField label="Источник" value={form.source} onChange={(e) => handleChange("source", e.target.value)} />
            <TextField label="Год выпуска" type="number" value={form.releaseYear} onChange={(e) => handleChange("releaseYear", e.target.value)} />
            <TextField label="URL изображения" value={form.image} onChange={(e) => handleChange("image", e.target.value)} />
            <TextField
              label="Описание"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              multiline
              minRows={3}
              sx={{ gridColumn: { md: "1 / 3" } }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleSave}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CrudPage;

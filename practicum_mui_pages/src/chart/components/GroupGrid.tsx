import { DataGrid } from '@mui/x-data-grid';
import { tGroup } from "../groupdata";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

type GroupProps = {
  data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
  const columns = [
    { field: 'Группа', headerName: 'Группа', flex: 1 },
    { field: 'Минимальная высота', headerName: 'Минимальная высота', flex: 1 },
    { field: 'Максимальная высота', headerName: 'Максимальная высота', flex: 1 },
    { field: 'Средняя высота', headerName: 'Средняя высота', flex: 1 },
  ];

  return (
    <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
      <DataGrid
      showToolbar={true}
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </Container>
  );
}

export default GroupGrid;
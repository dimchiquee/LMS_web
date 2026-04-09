import { useParams, Link } from 'react-router-dom';
import structures from '../data';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';

function Building() {
  const { id } = useParams();

  const building = structures[Number(id)];

  return (
    <div>
      <Navbar active="2" />
              <Box sx={{ mt: 2 }}>
        <Typography sx={{ mt: 2 }}>
          <Link to="/">Главная</Link> / {building.title}
          </Typography>
        </Box>
      <Container maxWidth="md">

        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" align="center" sx={{ mt: 2 }}>
            {building.title}
          </Typography>

          <Box
            component="img"
            src={building.img}
            alt={building.title}
            sx={{ width: '100%', mb: 2 }}
          />
        </Box>
      </Container>
<Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    mt: 2,
  }}
>
  {building.description.map((item, index) => (
    <Box
      key={index}
      sx={{
        width: {
          xs: '100%',
          md: '48%',
        },
      }}
    >
      <Typography sx={{ textAlign: 'justify' }}>
        {item}
      </Typography>
    </Box>
  ))}
</Box>
    </div>
  );
}

export default Building;
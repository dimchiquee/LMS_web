import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
  sx={{
    mt: 2,
    py: 2,
    textAlign: 'center',
    borderTop: '1px solid',
    borderColor: 'divider',
  }}
>
      <Typography variant="body2">
      Самые высокие здания и сооружения
      </Typography>
    </Box>
  );
}

export default Footer;
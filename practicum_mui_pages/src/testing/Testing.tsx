import Navbar from "../components/Navbar";
import Typography from '@mui/material/Typography';
import Quiz from "./features/Quiz";


function Testing() {
 return (
 <div>
 <Navbar active="4"/>
    <Typography variant="h6" sx={{ mt: 3 }}>
         <Quiz/>
    </Typography>
 </div>
 );
}

export default Testing;

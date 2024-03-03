import axios from "axios";
import { Navigate } from 'react-router-dom';
import { Catalogue } from "./Catalogue";
import { AppBar, Box, Button, Grid, IconButton, Paper, Stack, Toolbar, Typography,  } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

interface Props{
    user: User,
    setUser: (newUser: User) => void;
}

export const HomePage: React.FC<Props> = ({user, setUser}) => {
    console.log(user)

//     return  <Box sx={{ flexGrow: 1 }}>
//     <AppBar position="static">
//       <Toolbar>
//         <IconButton
//           size="large"
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           sx={{ mr: 2 }}
//         >
//         </IconButton>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           News
//         </Typography>
//         <Button color="inherit">Login</Button>
//       </Toolbar>
//     </AppBar>
//     <Catalogue user={user}></Catalogue>
//   </Box>

    
      return <Stack width={'fit-content'} spacing={5} justifyItems={'end'} alignSelf={'end'} alignContent={'end'} justifyContent={'end'}>
        <Grid container>
            <Grid item sm={6} justifyContent="start">
            <Box display="flex" justifyContent="flex-start">
            <Typography  variant="h5" alignSelf={'left'} color={'white'}>
                {user.username} 
            </Typography>
            </Box>
            </Grid>
            <Grid item sm={6}>
                <Box display="flex" justifyContent="flex-end">
                <Button sx={{maxHeight: '40px'}}  size='small' onClick={() => {}}>
                <LogoutIcon color={'warning'} fontSize='large'/>
            </Button>
                </Box>

            </Grid>
        </Grid>
        <Catalogue user={user}></Catalogue>
       </Stack>
    }
import { Navigate } from 'react-router-dom';
import { Catalogue } from "./Catalogue";
import { Box, Button, Grid, Stack, Typography, } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

interface Props {
    user: User,
    setUser: (newUser: User) => void;
}

export const HomePage: React.FC<Props> = ({ user, setUser }) => {


    return <>{user.username && user.password ?
        <Stack width={'fit-content'} spacing={5} justifyItems={'end'} alignSelf={'end'} alignContent={'end'} justifyContent={'end'}>
            <Grid container>
                <Grid item sm={6} justifyContent="start">
                    <Box display="flex" justifyContent="flex-start">
                        <Typography variant="h5" alignSelf={'left'} color={'white'}>
                            {user.username}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button sx={{ maxHeight: '40px' }} size='small' onClick={() => setUser({ username: '', password: '' })}>
                            <LogoutIcon color={'warning'} fontSize='large' />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Catalogue user={user}></Catalogue>
        </Stack> : < Navigate to="/login" />}
    </>
}
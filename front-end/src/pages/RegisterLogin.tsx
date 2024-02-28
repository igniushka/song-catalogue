import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';


export default function RegisterLogin(){
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
//     return  <Box
//     sx={{
//       display: 'flex',
//       flexWrap: 'wrap',
//       '& > :not(style)': {
//         m: 1,
//         width: 128,
//         height: 128,
//       },
//     }}
//   >
//      <Paper>
//      <TextField style={{width: 128}} id="outlined-basic" label="Outlined" variant="outlined" />
//     </Paper>
// </Box>
// }

const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Email:', email, 'Password:', password);
  };
return (
    <Container maxWidth="xs">
        <Paper>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="username"
          name="username"
          autoFocus
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
        </Paper>
    </Container>
  );}
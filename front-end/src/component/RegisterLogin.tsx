import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Link from '@mui/material/Link';

interface Props {
  headerText: string,
  buttonText: string,
  bottomText: string,
  link_path: string,
  link_text: string,
  on_submit: (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => void;
}

export const RegisterLogin: React.FC<Props> = ({headerText, buttonText, bottomText, link_path, link_text, on_submit}) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
return (
    <Container maxWidth="xs">
        <Paper>
        <Box padding={1}>
      <Typography component="h1" variant="h5">
        {headerText}
      </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
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
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={(event)=>on_submit(event, username, password)}
        >
          {buttonText}
        </Button>
        <Typography component="h1" variant="h5">
       {bottomText} <Link href={link_path}> {link_text} </Link>
      </Typography>
      </Box>
        </Paper>
    </Container>
  );}
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
}

export const RegisterLogin: React.FC<Props> = ({headerText, buttonText, bottomText, link_path, link_text}) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Email:', username, 'Password:', password);
  };
return (
    <Container maxWidth="xs">
        <Paper>
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
        >
          {buttonText}
        </Button>
        <Typography component="h1" variant="h5">
       {bottomText} <Link href={link_path}> {link_text} </Link>
      </Typography>
        </Paper>
    </Container>
  );}
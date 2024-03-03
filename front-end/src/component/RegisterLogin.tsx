import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { Message } from '../types/MessageAlert';
import { Alert, AlertColor } from '@mui/material';

interface Props {
  headerText: string,
  buttonText: string,
  bottomText: string,
  linkPath: string,
  linkText: string,
  message: Message,
  setMessage : (message: Message) => void,
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => void,
}

export const RegisterLogin: React.FC<Props> = ({headerText, buttonText, bottomText, linkPath, linkText, message, setMessage, onSubmit}) => {
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
      <Typography component="h5" variant="h5">
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
       { message.text ? <Alert severity={message.severity} onClose={() => {setMessage({...message, text: "" })}}>
        {message.text}
        </Alert>  : null }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={(event)=>onSubmit(event, username, password)}
        >
          {buttonText}
        </Button>
        <Typography component="h1" variant="h5">
       {bottomText} <Link href={linkPath}> {linkText} </Link>
      </Typography>
      </Box>
        </Paper>
    </Container>
  );}
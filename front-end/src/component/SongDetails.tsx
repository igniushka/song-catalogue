

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState } from 'react'
// import { Paper } from '@mui/material';

interface Props {
  song: Song,
  updateSong: (song: Song) => void,
  editable: boolean,
  open: boolean,
  setOpen: (song: boolean) => void,
}
export const SongDetails: React.FC<Props> =({song, updateSong, editable, open, setOpen}) => {
    // console.log(song)
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);


    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setUsername(event.target.value);
      };

    const style = {
        position: 'absolute' as 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 1,
        p: 4,
      };

return( 
    <Modal 
      keepMounted
      open={open}
      onClose={() => setOpen(false)}>
        <Stack direction="column" sx={style}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          autoFocus
          value={song.name}
          onChange={handleUsernameChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Artist"
          name="artist"
          autoFocus
          value={song.artist}
          onChange={handleUsernameChange}
        />

        </Stack>
    </Modal>
    )
}
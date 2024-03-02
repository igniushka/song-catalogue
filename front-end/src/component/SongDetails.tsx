

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
        <Stack spacing={1} direction="column" sx={style}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          autoFocus
          value={song.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateSong({ ...song, name: event.target.value })}
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateSong({ ...song, artist: event.target.value })}
        /> 
        <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Album"
        name="album"
        autoFocus
        value={song.album}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateSong({ ...song, album: event.target.value })}
        />
        <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Genre"
        name="genre"
        autoFocus
        value={song.genre}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateSong({ ...song, genre: event.target.value })}
      />
      <Stack spacing={1} direction="row">
      <TextField sx={{width: "50%"}}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Release year"
        name="year"
        type="number"
        autoFocus
        value={song.year}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateSong({ ...song, year: parseInt(event.target.value) })}
      />
        <TextField sx={{width: "50%"}}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Length (s)"
        name="length"
        autoFocus
        type="number"
        value={song.length}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateSong({ ...song, length: parseInt(event.target.value) })}
      /></Stack>
        </Stack>
    </Modal>
    )
}
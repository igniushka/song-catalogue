

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState } from 'react'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import {Song} from '../model/SongModel'


interface Props {
  song: Song,
  updateSong: (song: Song) => void,
  creatingNewSong: boolean,
  open: boolean,
  setOpen: (song: boolean) => void,
  submit: () => void,
  headerText: string,
  onDelete: () => void,
}


export const SongDetails: React.FC<Props> =({song, updateSong, creatingNewSong, open, setOpen, submit, headerText, onDelete}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [editing, setEditing] = useState<boolean>(false);

      const validateAndSubmit = () => {
        setErrorMessage("")
        if (song.name === ""){
            setErrorMessage("Song name required!");
        } else if (song.artist === ""){
            setErrorMessage("Song artist required!");
        } else if (song.album === ""){
            setErrorMessage("Song album required!");
        } else if (song.genre === ""){
            setErrorMessage("Song genre required!");
        } else if (song.length === 0){
            setErrorMessage("Song length required!");
        } else if (song.year === 0){
            setErrorMessage("Song release year required!");
        } else{
            submit();
        }
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
        p: 2,
      };

      const textFieldstyle = {
        color: 'primary',
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "#000000",
        },
      }
      

return( 
    <Modal 
      keepMounted
      open={open}
      onClose={() => setOpen(false)}>
        <Stack spacing={1} direction="column" sx={style}>
        <Stack spacing={1} direction="row" justifyContent={creatingNewSong? 'center' : 'end'}>
            <Typography  color={'black'} variant="h5"> {headerText} </Typography>
            { !creatingNewSong ?
            <>
            <Button  variant="outlined" sx={{maxHeight: '40px'}}  size='small' onClick={() => setEditing(!editing)}>
            <EditIcon color={'warning'} fontSize='large'/>
            </Button>
            <Button onClick={() => onDelete()} hidden={creatingNewSong} variant="outlined" sx={{maxHeight: '40px'}}  size='small'>
            <DeleteIcon  color={'error'} fontSize='large'/>
            </Button></> : null }
        </Stack> 
        <TextField
          disabled={!creatingNewSong && !editing}
          sx={textFieldstyle}
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
          disabled={!creatingNewSong && !editing}
          sx={textFieldstyle}
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
          disabled={!creatingNewSong && !editing}
          sx={textFieldstyle}
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
          disabled={!creatingNewSong && !editing}
          sx={textFieldstyle}
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
      <TextField
          disabled={!creatingNewSong && !editing}
          sx={{...textFieldstyle, width: "50%"}}
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
        <TextField
          // disabled={!creatingNewSong && !editing}
          sx={{...textFieldstyle, width: "50%"}}
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
      />
      </Stack>
    {errorMessage!=="" ? <Alert severity="warning">
      {errorMessage}
    </Alert> : null}
    {creatingNewSong || editing?
        <Button variant="contained" onClick={validateAndSubmit}>
         Submit
        </Button>
      : null }
        </Stack>
    </Modal>
    )
}
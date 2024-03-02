

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState } from 'react'
import { SongDetails } from './SongDetails';

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void,
}
export const NewSong: React.FC<Props> =({open, setOpen}) => {
    console.log(open)
    const newSong: Song = {
        id: "", 
        name: "",
        artist: "",
        album: "",
        genre: "",
        length: 0,
        year: 0
    }
    const [song, setSong] = useState<Song>(newSong);


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
     <SongDetails open={open} song={song} updateSong={setSong} editable={true} setOpen={setOpen}/>
    )
}
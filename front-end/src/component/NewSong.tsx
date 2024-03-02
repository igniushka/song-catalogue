

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState } from 'react'
import { SongDetails } from './SongDetails';
import axios from "axios";


interface Props {
  user: User,
  open: boolean,
  setOpen: (open: boolean) => void,
  onSuccess: () => void,
}
export const NewSong: React.FC<Props> =({user, open, setOpen, onSuccess}) => {
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

    const create_song_request = {
        method: 'post',
        url: import.meta.env.VITE_BACK_END_BASE_URL + "/song",
        data: song,
        headers: {
          user: user.username
        }
      }

    const createSong = () =>{
        if (user.username && user.password) {
            axios(create_song_request)
            .then((response) => {
                if (response.status==200){
                    onSuccess()
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

return(
    <>
  <SongDetails submit={createSong} open={open} song={song} updateSong={setSong} editable={true} setOpen={setOpen}/>
</>
    )
}
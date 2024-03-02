

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState } from 'react'
import { SongDetails } from './SongDetails';
import axios from "axios";
import {Song, emptySong} from '../model/SongModel';


interface Props {
  song: Song, 
  user: User,
  open: boolean,
  setOpen: (open: boolean) => void,
  onSuccess: () => void,
}
export const ViewSong: React.FC<Props> =({song, user, open, setOpen, onSuccess}) => {
    const [updatedSong, setUpdatedSong] = useState<Song>({...song});

    const update_song_request = {
        method: 'post',
        url: import.meta.env.VITE_BACK_END_BASE_URL + "/song",
        data: updatedSong,
        headers: {
          user: user.username
        }
      }

    const updateSong = () =>{
        if (user.username && user.password) {
            axios(update_song_request)
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
     <SongDetails submit={updateSong} open={open} song={song} updateSong={setUpdatedSong} creatingNewSong={false} setOpen={setOpen}/>
    </>
    )
}
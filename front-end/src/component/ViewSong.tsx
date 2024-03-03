

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState, useEffect } from 'react'
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

    const renewSong = () => {
        setUpdatedSong({...song})
    }
    useEffect(() => renewSong(), [song])


    const updateSong = () => {
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

    const delete_song_request = {
        method: 'delete',
        url: import.meta.env.VITE_BACK_END_BASE_URL + "/song/" + updatedSong.id,
        headers: {
          user: user.username
        }
      }

    const deleteSong = () => {
        console.log(updatedSong)
        if (user.username && user.password) {
            axios(delete_song_request)
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
     <SongDetails headerText={'View Song Details'} submit={updateSong} open={open} song={updatedSong} updateSong={setUpdatedSong} creatingNewSong={false} setOpen={setOpen} onDelete={deleteSong}/>
    )
}

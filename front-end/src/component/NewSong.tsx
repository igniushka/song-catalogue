

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
import { Message } from '../model/MessageAlert';
import { AlertColor } from '@mui/material';


interface Props {
  user: User,
  open: boolean,
  setOpen: (open: boolean) => void,
  onResponse: (message: Message) => void,
}
export const NewSong: React.FC<Props> =({user, open, setOpen, onResponse}) => {

    const [song, setSong] = useState<Song>({...emptySong});

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
                  onResponse({text: 'Song created!', severity: 'success' as AlertColor})
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

return(
  <SongDetails  headerText={'Create new song'}  submit={createSong} open={open} song={song} updateSong={setSong} creatingNewSong={true} setOpen={setOpen} onDelete={()=>{}}/>
    )
}
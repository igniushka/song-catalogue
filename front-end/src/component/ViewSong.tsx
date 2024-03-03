

import {useState, useEffect } from 'react'
import { SongDetails } from './SongDetails';
import axios from "axios";
import {Song} from '../types/Song';
import { Message } from '../types/MessageAlert';
import { AlertColor } from '@mui/material/Alert';


interface Props {
  song: Song, 
  user: User,
  open: boolean,
  setOpen: (open: boolean) => void,
  onResponse: (message: Message) => void,
}
export const ViewSong: React.FC<Props> =({song, user, open, setOpen, onResponse}) => {
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
                    onResponse({text: 'Song created!', severity: 'success' as AlertColor})
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
                    onResponse({text: 'Song deleted!', severity: 'success' as AlertColor})
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



import { useState } from 'react'
import { SongDetails } from './SongDetails/SongDetails';
import axios from "axios";
import { Song, emptySong } from '../types/Song';
import { Message } from '../types/MessageAlert';
import { AlertColor } from '@mui/material';
import { createBasicAuthHeader } from '../helper';
import { useUser } from "../context/Authentication.tsx"


interface Props {
  open: boolean,
  setOpen: (open: boolean) => void,
  onResponse: (message: Message) => void,
}
export const NewSong: React.FC<Props> = ({ open, setOpen, onResponse }) => {
  const { user } = useUser();
  const [song, setSong] = useState<Song>({ ...emptySong });


  const createSong = () => {
    if (user?.username && user?.password) {
      const basicAuthHeader = createBasicAuthHeader(user.username, user.password);
      const create_song_request = {
        method: 'post',
        url: "/song",
        data: song,
        headers: {
          Authorization: basicAuthHeader
        }
      }

      axios(create_song_request)
        .then((response) => {
          if (response.status == 200) {
            setSong({ ...emptySong })
            onResponse({ text: 'Song created!', severity: 'success' as AlertColor })
          }
        })
        .catch(() => {
          setSong({ ...emptySong })
          onResponse({ text: 'Failed to create song', severity: 'error' as AlertColor })
        })
    }
  }

  return (
    <SongDetails headerText={'Create new song'} submit={createSong} open={open} song={song} updateSong={setSong} creatingNewSong={true} setOpen={setOpen} onDelete={() => { }} />
  )
}
import { useState, useEffect } from 'react'
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { SongTable } from '../component/SongTable';
import { Paper } from '@mui/material';


interface Props{
    user: User,
    setUser: (newUser: User) => void;
}


export  const Catalogue: React.FC<Props> =  ({user, setUser}) => {
    const [songList, setSongList] = useState<Song[]>([]);
    useEffect(() => getSongs, [])

      const song_request = {
        method: 'get',
        url: import.meta.env.VITE_BACK_END_BASE_URL + "/song",
        headers: {
          user: user.username
        }
      }

    const getSongs = () =>{
        if (user.username && user.password) {
            axios(song_request)
            .then((response) => {
                setSongList(response.data)
                console.log("Song list Set!")
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return <>{user.username && user.password ?
    <Paper sx={{width: '100%',  height: 'fit-content', display: 'flex', alignItems: 'start',  justifyContent: 'center', padding: '20px', marginTop: '-10%'}}>
        <SongTable songs={songList}/>
    </Paper> : 
    <Navigate to="/login"/> }</>
}
      
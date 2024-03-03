import {useRef, useState, useEffect } from 'react'
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { SongTable } from '../component/SongTable';
import { Paper } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperText } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Height } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import Slide from '@mui/material/Slide';
import {SongDetails} from '../component/SongDetails'
import { NewSong } from '../component/NewSong';
import {Song, emptySong} from '../model/SongModel';
import { ViewSong } from '../component/ViewSong';
enum Sort {
  Year = "Year",
  Name = "Name"
}

interface Props{
    user: User,
    setUser: (newUser: User) => void;
}

interface Alert{
  text: string,
  severity: string
}

export  const Catalogue: React.FC<Props> =  ({user, setUser}) => {
    const [originalSongList, setOriginalSongList] = useState<Song[]>([]);
    const [sortAscending, setSortAscending] = useState(false);
    const [processedSongs, setProcessedSongs] = useState<Song[]>([]);
    const [sortBy, setSortBy] = useState<Sort>(Sort.Year)
    const [pageNum, setPageNum] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showFilters, setShowFilters] = useState(false);
    const [yearFilter, setYearFilter] = useState("");
    const [artistFilter, setArtistFilter] = useState("");
    const [openNewSong, setOpenNewSong] = useState(false);
    const [message, setMessage] = useState<Alert>({text: "", severity: "warning"});
    const [selectedSong, selectSong] = useState<Song>({...emptySong});
    const [openSongDetails, setOpenSongDetails] = useState<boolean>(false);


    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => getSongs, [])
    useEffect(()=> setPageNumTrigger(), [rowsPerPage, processedSongs])
    useEffect(()=> sortAndFilterSongs(), [artistFilter, yearFilter, originalSongList, sortBy, sortAscending])

      const song_request = {
        method: 'get',
        url: import.meta.env.VITE_BACK_END_BASE_URL + "/song",
        headers: {
          user: user.username
        }
      }

    const getSongs = () => {
        if (user.username && user.password) {
            axios(song_request)
            .then((response) => {
                setOriginalSongList(response.data)
                console.log("Song list Set!")
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    const onCreateSongSuccess = () =>{
      setOpenNewSong(false);
      setMessage({text: "New song created!", severity: "success"})
      getSongs()
    }

    const onUpdateSongSuccess = () =>{
      setOpenNewSong(false);
      setMessage({text: "Song updated!", severity: "success"})
      getSongs()
    }

  const toggleShowFilterRow = (event: unknown) => {
      setShowFilters(!showFilters)
      }; 

  const toggleSort = (event: unknown) => {
    setSortAscending(!sortAscending)
  }; 

  const viewSongDetails = (song: Song) => {
    console.log(song)
    selectSong({...song})
    setOpenSongDetails(true)
  }

  const selectSortBy = (event: SelectChangeEvent<String>) => {
    let newSortType;
     switch (event.target.value){
        case "Year":
            newSortType = Sort.Year;
            break
        default:
            newSortType = Sort.Name;
            break;
    }
    setSortBy(newSortType)
  }

  
  const handleYearFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearFilter(event.target.value);
  };

  const handleArtistFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistFilter(event.target.value);
  };

  const setPageNumTrigger = () => {
    console.log("setPageNumTrigger")
    setPageNum(Math.ceil(processedSongs.length/rowsPerPage))
  }
  const changePage = (newPage: number) => {
    console.log("changePage")
    console.log(newPage)
    setPage(newPage);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("handleChangePage")
    newPage-=1
    changePage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
    console.log("handleChangeRowsPerPage")
    setRowsPerPage(+event.target.value);
    changePage(0);
    console.log("changed page")
  };


    const sortAndFilterSongs = () =>{
        // copy the array not to modify the state directly
        let newSongList: Song[] = [...originalSongList];
        if (artistFilter!==""){
         newSongList = newSongList.filter(song => song.artist.toLowerCase().includes(artistFilter));
        }
        if (yearFilter!==""){
          const yearNum = parseInt(yearFilter)
          newSongList = newSongList.filter(song => song.year === yearNum);
         }
        if (sortBy === Sort.Year){
            if (sortAscending) {
                newSongList.sort((song_a, song_b) => song_a.year - song_b.year);
            } else {
                newSongList.sort((song_a, song_b) => song_b.year - song_a.year);
            }
        } else {
            if (sortAscending) {
                newSongList.sort((song_a, song_b) => {
                    if (song_a.name < song_b.name) return -1;
                    if (song_a.name > song_b.name) return 1;
                    return 0;
                });
            } else {
                newSongList.sort((song_a, song_b) => {
                    if (song_a.name > song_b.name) return -1;
                    if (song_a.name < song_b.name) return 1;
                    return 0;
                });            
            }
        }
        setProcessedSongs(newSongList)
    }

    return <>{user.username && user.password ?
    <Paper sx={{width: '100%',  height: 'fit-content', display: 'flex', alignItems: 'start',  justifyContent: 'center', padding: '20px', marginTop: '-10%'}}>
      <NewSong onSuccess={onCreateSongSuccess} user={user} open={openNewSong} setOpen={setOpenNewSong}/>
      <ViewSong song={selectedSong} onSuccess={onUpdateSongSuccess} user={user} open={openSongDetails} setOpen={setOpenSongDetails}/>
      <Stack padding={0}  spacing={1} >
      {message.text!=="" ? <Alert severity={message.severity as AlertColor} onClose={() => {setMessage({...message, text: "" })}}>
      {message.text}
    </Alert> : null} 
      <Stack paddingBottom={1} spacing={1} width={"562px"} direction="row" justifyContent="start">
      <Button sx={{maxHeight: '40px'}} onClick={toggleShowFilterRow} size='small'>
      <SortIcon color={showFilters? 'primary': 'disabled' } fontSize='large'/>
      </Button>
      <FormControl  sx={{width: '80px', m: 1, maxHeight: 40}}>
        <InputLabel>Rows</InputLabel>
        <Select sx={{}} defaultValue="Ten" label="Rows" size="small"
          value={rowsPerPage.toString()}
          onChange={handleChangeRowsPerPage}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <Pagination siblingCount={0} color="primary" size='large' onChange={handleChangePage} page={page+1} count={pageNum} variant="outlined" shape="rounded" />
      <Button sx={{width: '10%', maxHeight: '40px', minWidth: '0'}} onClick={() => {setOpenNewSong(true)}} size='small'>
      <AddBoxIcon color={"primary"} fontSize='large'/>
      </Button>     
      </Stack>
      <Box hidden={!showFilters} ref={containerRef}>
        <Slide direction={"down"} in={showFilters} container={containerRef.current}>
        <Stack width={"562px"} sx={{margin: '0px'}} paddingBottom={1} spacing={1} direction="row" justifyContent="start">
        <TextField onChange={handleArtistFilterChange} value={artistFilter} sx={{width: '30%'}} size='small' label="Artist Search" type="search" />
        <TextField onChange={handleYearFilterChange} value={yearFilter} type="number" sx={{width: '30%'}} size='small' label="Year Search" />
      <FormControl sx={{width: '30%', maxHeight: 40}}>
        <InputLabel>Sort</InputLabel>
        <Select defaultValue="Year" label="Sort" size="small"
          value={sortBy}
          onChange={selectSortBy}>
          <MenuItem value={"Year"}>Year</MenuItem>
          <MenuItem value={"Name"}>Name</MenuItem>
        </Select>
      </FormControl>
      <Button sx={{width: '10%', maxHeight: '40px'}} onClick={toggleSort} size='small'>
        {sortAscending ? <ArrowUpwardIcon fontSize="medium"></ArrowUpwardIcon> : <ArrowDownward fontSize="medium"></ArrowDownward>}
      </Button>
      </Stack> 
      </Slide>
        </Box>
        <SongTable selectSong={viewSongDetails} songs={processedSongs}  rowsPerPage={rowsPerPage} page={page}/>
        </Stack>
    </Paper> : 
    <Navigate to="/login"/> }</>
}
      
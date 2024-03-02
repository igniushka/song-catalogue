import { useState, useEffect } from 'react'
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { SongTable } from '../component/SongTable';
import { Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
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


enum Sort {
  Year = "Year",
  Name = "Name"
}
enum Filter {
    Year = "Year",
    Artist = "Artist"
  }

interface Props{
    user: User,
    setUser: (newUser: User) => void;
}


export  const Catalogue: React.FC<Props> =  ({user, setUser}) => {
    const [originalSongList, setOriginalSongList] = useState<Song[]>([]);
    const [sortAscending, setSortAscending] = useState(false);
    const [processedSongs, setProcessedSongs] = useState<Song[]>([]);
    const [filterBy, setFilterBy] = useState<Filter>(Filter.Artist)
    const [sortBy, setSortBy] = useState<Sort>(Sort.Year)
    const [pageNum, setPageNum] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showFilters, setShowFilters] = useState(false);


    useEffect(() => getSongs, [])
    useEffect(()=> setPageNumTrigger(), [rowsPerPage, processedSongs])
    useEffect(()=> sortAndFilterSongs(), [originalSongList, sortBy, sortAscending])

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
                setOriginalSongList(response.data)
                console.log("Song list Set!")
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    const toggleShowFilterRow = (event: unknown) => {
        if (showFilters){
            setShowFilters(false);
        } else {
            setShowFilters(true);
        }
      }; 

  const toggleSort = (event: unknown) => {
    if (sortAscending){
        setSortAscending(false);
    } else {
        setSortAscending(true);
    }
  }; 

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

  const selectFilter = (event: SelectChangeEvent<String>) => {
    let newFilterType;
     switch (event.target.value){
        case "Year":
            newFilterType = Filter.Year;
            break
        default:
            newFilterType = Filter.Artist;
            break;
    }
    setFilterBy(newFilterType)
  }


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
        const newSongList: Song[] = [...originalSongList];
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
        <Stack padding={0}  spacing={0}>
        { showFilters && <Stack sx={{margin: '0px'}} paddingBottom={1} spacing={1} direction="row" justifyContent="start">
        <TextField sx={{width: '150px'}} size='small' label="Artist Search" type="search" />
        <TextField sx={{width: '150px'}} size='small' label="Year Search" type="search" />
        <FormControl sx={{ m: 1, minWidth: 80, maxHeight: 40}}>
        <InputLabel>Filter</InputLabel>
        <Select defaultValue="Artist" label="Filter" size="small"
          value={filterBy}
          onChange={selectFilter}>
          <MenuItem value={"Artist"}>Artist</MenuItem>
          <MenuItem value={"Year"}>Year</MenuItem>
        </Select>
      </FormControl>      
      <FormControl sx={{ m: 1, minWidth: 80, maxHeight: 40}}>
        <InputLabel>Sort</InputLabel>
        <Select defaultValue="Year" label="Sort" size="small"
          value={sortBy}
          onChange={selectSortBy}>
          <MenuItem value={"Year"}>Year</MenuItem>
          <MenuItem value={"Name"}>Name</MenuItem>
        </Select>
      </FormControl>
      <Button sx={{maxHeight: '40px'}} onClick={toggleSort} size='small'>
        {sortAscending ? <ArrowUpwardIcon fontSize="medium"></ArrowUpwardIcon> : <ArrowDownward fontSize="medium"></ArrowDownward>}
      </Button>
      </Stack> }
      <Stack paddingBottom={1} spacing={1} direction="row" justifyContent="start">
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
      <Pagination siblingCount={1} color="primary" size='large' onChange={handleChangePage} page={page+1} count={pageNum} variant="outlined" shape="rounded" />
      <Button sx={{maxHeight: '40px'}} onClick={toggleShowFilterRow} size='small'>
      <SortIcon color={showFilters? 'primary': 'disabled' } fontSize='large'/>
      </Button>
      </Stack>
        <SongTable songs={processedSongs}  rowsPerPage={rowsPerPage} page={page}/>
        </Stack>
    </Paper> : 
    <Navigate to="/login"/> }</>
}
      
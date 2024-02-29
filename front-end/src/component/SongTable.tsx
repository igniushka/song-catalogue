import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperText } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Column {
  id: 'name' | 'artist' | 'album' | 'year';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'artist', label: 'Artist', minWidth: 100 },
  { id: 'album', label: 'Album', minWidth: 100, align: 'right',},
  { id: 'year', label: 'Year', minWidth: 100, align: 'right'},
];


interface Props {
   songs: Song[]
}

export const SongTable: React.FC<Props> =({songs}) => {
  const [pageNum, setPageNum] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState("down");


  const toggleSort = (event: unknown) => {
    if (sort==="down"){
      setSort("up");
    } else {
      setSort("down");
    }
  }; 

  const setPageNumTrigger = () => {
    console.log("setPageNumTrigger")
    setPageNum(Math.ceil(songs.length/rowsPerPage))
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

  useEffect(()=> setPageNumTrigger(), [rowsPerPage, songs])


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <Stack padding={1} spacing={2} direction="row" justifyContent="end">
      <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 40}}>
        <InputLabel>Sort</InputLabel>
        <Select defaultValue="Ten" label="Sort" size="small"
          value={rowsPerPage.toString()}
          onChange={handleChangeRowsPerPage}>
          <MenuItem value={10}>Year<ArrowDropUpIcon/></MenuItem>
          <MenuItem value={25}>Year</MenuItem>
          <MenuItem value={50}>Song Name</MenuItem>
          <MenuItem value={100}>Song Name</MenuItem>

        </Select>
      </FormControl>
      </Stack>

      <Stack padding={1} spacing={2} direction="row" justifyContent="end">
      <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 40}}>
        <InputLabel>Rows</InputLabel>
        <Select defaultValue="Ten" label="Rows" size="small"
          value={rowsPerPage.toString()}
          onChange={handleChangeRowsPerPage}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>

        </Select>
      </FormControl>
      <Pagination color="primary" size='large' onChange={handleChangePage} page={page+1} count={pageNum} variant="outlined" shape="rounded" />

      </Stack>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {songs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}


import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SongDetails } from './SongDetails';
import { fireEvent, render, screen } from '@testing-library/react';
import { Song, emptySong } from '../../types/Song';
import '@testing-library/jest-dom'

let song: Song;
let creatingNewSong: boolean;
let headerText: string;
let updateSong: any;
let submit: any;
let setOpen: any;
let onDelete: any;

beforeEach(() => {
  song = {
    id: '123',
    name: 'song1',
    artist: 'artistName',
    album: "album1",
    genre: "pop",
    length: 200,
    year: 2005
  }
  creatingNewSong = false;
  headerText = 'test header'
  updateSong = vi.fn();
  submit = vi.fn();
  setOpen = vi.fn();
  onDelete = vi.fn();
})

describe('SongDetails component', () => {
  it('should render as expected when viewing an existing song', async () => {
    render(<SongDetails song={song} creatingNewSong={creatingNewSong} updateSong={updateSong} submit={submit}
      setOpen={setOpen} onDelete={onDelete} headerText={headerText} open={true} />)

    expect(screen.queryByText('test header')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('song1')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('artistName')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('album1')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('pop')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('200')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('2005')).toBeInTheDocument();
  })

  it('should allow user to edit an existing song', async () => {
    render(<SongDetails song={song} creatingNewSong={creatingNewSong} updateSong={updateSong} submit={submit}
      setOpen={setOpen} onDelete={onDelete} headerText={headerText} open={true} />)
    expect(await screen.findByLabelText('edit')).toBeInTheDocument();
    const editBtn = await screen.findByLabelText('edit');
    fireEvent.click(editBtn)
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    const submitBtn = await screen.findByText('Submit');
    fireEvent.click(submitBtn)
    expect(submit).toHaveBeenCalledTimes(1)
  })
  it('should allow user to delete an existing song', async () => {
    render(<SongDetails song={song} creatingNewSong={creatingNewSong} updateSong={updateSong} submit={submit}
      setOpen={setOpen} onDelete={onDelete} headerText={headerText} open={true} />)
    expect(await screen.findByLabelText('delete')).toBeInTheDocument();
    const deleteBtn = await screen.findByLabelText('delete');
    fireEvent.click(deleteBtn)
    expect(onDelete).toHaveBeenCalledTimes(1)
  })
  it('should allow display an error when fields are missing for a new song', async () => {
    creatingNewSong = true;
    render(<SongDetails song={emptySong} creatingNewSong={creatingNewSong} updateSong={updateSong} submit={submit}
      setOpen={setOpen} onDelete={onDelete} headerText={headerText} open={true} />)
      expect(await screen.findByText('Submit')).toBeInTheDocument();
      const submitBtn = await screen.findByText('Submit');
      fireEvent.click(submitBtn)
      expect(await screen.findByText('Song name required!')).toBeInTheDocument();
    })
});
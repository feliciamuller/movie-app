import { Toolbar, Box, Typography, Autocomplete, TextField } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import popcornLogo from '../Images/popcorn-time-netflix-download-300x300.png';
import SelectedMovie from './SelectedMovie';
import { useQuery } from '@tanstack/react-query';
import { getMoviesOnSearch, getMoviesOnSearchById } from '../Data/api';
import { useState } from 'react';
import { Movie } from '../Models/Movie';

export const useFetchSearchMovies = (query: string | undefined) => {
  return useQuery({
    queryFn: () => getMoviesOnSearch(query), //hämtar från apifunktionen
    queryKey: [`showSearchMovies`, query], //används som identifikation för queryn
    enabled: !!query,
  });
};

export const useGetMoviesById = (query: number) => {
  return useQuery({
    queryFn: () => getMoviesOnSearchById(query), //hämtar från apifunktionen
    queryKey: [`showSearchMovies`, query], //används som identifikation för queryn
    enabled: !!query,
  });
};

export default function Navbar() {
  const [userInput, setUserInput] = useState<string | undefined>();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>();

  const { data: movie } = useFetchSearchMovies(userInput); // använder userInput för att söka i queryn

  const options = movie
    ? [...new Set(movie.map((mov) => mov.title))] // tar bort dubbletter
    : [];

  const handleSearch = (input: string) => {
    const userInputMovies = movie?.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()));
    console.log('Filtrerad', filteredMovies);
    setUserInput(input);
    setFilteredMovies(userInputMovies);
  };

  const handleOnInputChange = (input: string) => {
    //här tas det man skriver in
    const userInputMovies = movie?.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()));
    console.log('Filtrerad', filteredMovies); // denna behöver nollas när man navigerar till en annan sida
    setUserInput(input);
    setFilteredMovies(userInputMovies);
  };

  const handleLinkClick = () => {
    setFilteredMovies([]);
    setUserInput('');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Box sx={{ display: 'inline-flex' }}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <Box>
                <img src={popcornLogo} width='70px' height='auto' alt='movie-logo' />
              </Box>
              <NavLink className={({ isActive }) => (isActive ? 'active' : 'notActive')} to='/home' onClick={handleLinkClick}>
                <Typography variant='h5'>Home</Typography>
              </NavLink>
              <NavLink className={({ isActive }) => (isActive ? 'active' : 'notActive')} to='/topRated' onClick={handleLinkClick}>
                <Typography variant='h5'>Top rated</Typography>
              </NavLink>
              <NavLink className={({ isActive }) => (isActive ? 'active' : 'notActive')} to='/myFavourites' onClick={handleLinkClick}>
                <Typography variant='h5'>Liked movies</Typography>
              </NavLink>
            </Box>
          </Toolbar>
        </Box>
        <Box>
          <Link to='/search'>
            <Box sx={{}}>
              <Autocomplete
                sx={{ width: '170px' }}
                id='movieSearch'
                freeSolo
                options={options}
                onInputChange={(_e, newInputValue) => {
                  handleOnInputChange(newInputValue);
                }}
                onChange={(_e, userInput) => {
                  if (userInput) {
                    handleSearch(userInput);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ backgroundColor: 'primary.main', borderRadius: '8px' }}
                    {...params}
                    variant='filled'
                    label='Search movie'
                    color='secondary'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                )}
              />
            </Box>
          </Link>
        </Box>
      </Box>
      <SelectedMovie input={userInput} searchedMovie={filteredMovies} />
    </>
  );
}

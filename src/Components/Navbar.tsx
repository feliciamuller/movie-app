import { Toolbar, Box, Typography, Autocomplete, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchMovies from './SearchMovies';
import popcornLogo from '../Images/popcorn-time-netflix-download-300x300.png';
import SelectedMovie from './SelectedMovie';
import { useQuery } from '@tanstack/react-query';
import { getMoviesOnSearch, getMoviesOnSearchById } from '../Data/api';
import { useState } from 'react';
import { Movie } from '../Models/Movie';
import SearchResults from './SearchResults';

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
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>();
  const [selectedMovieId, setSelectedMovieId] = useState<number>();

  const { data: movie } = useFetchSearchMovies(userInput); // använder userInput för att söka i queryn
  // const { data: movieId } = useGetMoviesById(id);

  const options = movie
    ? [...new Set(movie.map((mov) => mov.title))] // Ta bort dubbletter
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
  console.log('userinput', userInput); // även denna måste nollas

  const handleLinkClick = () => {
    setFilteredMovies([]); // Nollställ när en länk klickas
    setUserInput(''); // Nollställ användarens input
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'inline-flex' }}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <img src={popcornLogo} width='70px' height='auto' alt='movie-logo' />
              </Box>
              <Link className='links' to='/' onClick={handleLinkClick}>
                <Typography variant='h6'>Home</Typography>
              </Link>
              <Link className='links' to='/topRatedMovies' onClick={handleLinkClick}>
                <Typography variant='h6'>Top rated</Typography>
              </Link>
              <Link className='links' to='/myLikedMovies' onClick={handleLinkClick}>
                <Typography variant='h6'>My liked movies</Typography>
              </Link>
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
                onInputChange={(e, newInputValue) => {
                  handleOnInputChange(newInputValue);
                }}
                onChange={(e, userInput) => {
                  if (userInput) {
                    handleSearch(userInput);
                  }
                }}
                // måste ta bort underlinen som dyker upp när man skriver
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

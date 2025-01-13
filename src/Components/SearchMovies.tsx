import { useQuery } from '@tanstack/react-query';
import { getMoviesOnSearch, getMoviesOnSearchById } from '../Data/api';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useState } from 'react';

export const useFetchSearchMovies = (query: string | undefined) => {
  return useQuery({
    queryFn: () => getMoviesOnSearch(query), //hämtar från apifunktionen
    queryKey: [`showSearchMovies`, query], //används som identifikation för queryn
    enabled: !!query,
  });
};

export const useGetMoviesById = (query: number) => {
  return useQuery({
    queryFn: () => getMoviesOnSearchById(query), // hämtar från apifunktionen
    queryKey: [`showSearchMovies`, query], // används som identifikation för queryn
    enabled: !!query,
  });
};
export default function SearchMovies() {
  const [userInput, setUserInput] = useState<string | undefined>();
  const { data: movie } = useFetchSearchMovies(userInput); // använder userInput för att söka i queryn

  const options = movie
    ? [...new Set(movie.map((mov) => mov.title))] // ta bort dubbletter
    : [];

  return (
    <Box sx={{}}>
      <Box sx={{ border: 'solid red' }}>
        <Autocomplete
          sx={{ width: '170px' }}
          id='movieSearch'
          freeSolo
          options={options}
          onInputChange={(_e, newInputValue) => {
            movie?.filter((movie) => movie.title.toLowerCase().includes(newInputValue.toLowerCase()));
          }}
          onChange={(_e, userInput) => {
            if (userInput) {
              movie?.filter((movie) => movie.title.toLowerCase().includes(userInput.toLowerCase()));
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
    </Box>
  );
}

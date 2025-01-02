import { useQuery } from '@tanstack/react-query';
import { getMoviesOnSearch, getMoviesOnSearchById } from '../Data/api';
import { Autocomplete, Box, TextField } from '@mui/material';
import { Movie } from '../Models/Movie';
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
    queryFn: () => getMoviesOnSearchById(query), //hämtar från apifunktionen
    queryKey: [`showSearchMovies`, query], //används som identifikation för queryn
    enabled: !!query,
  });
};
//HÄR SKA ALLA FILMER VISAS OCH DETALJER OM FILMEN
//NAVIGATIONEN BORDE KUNNA LÖSAS MED  QUERY GETBYID NÄR MAN KLICKAR PÅ EN FILM
export default function SearchMovies() {
  const [userInput, setUserInput] = useState<string | undefined>();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>();

  const { data: movie } = useFetchSearchMovies(userInput); // använder userInput för att söka i queryn
  // const { data: movieId } = useGetMoviesById(id);

  const options = movie
    ? [...new Set(movie.map((mov) => mov.title))] // Ta bort dubbletter
    : [];

  const handleSearch = (input: string) => {
    const userInputMovies = movie?.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()));
    setUserInput(input);
    setFilteredMovies(userInputMovies);
  };

  const handleOnInputChange = (input: string) => {
    //här tas det man skriver in
    const userInputMovies = movie?.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()));
    setUserInput(input);
    setFilteredMovies(userInputMovies);
  };

  return (
    <Box sx={{}}>
      <Box sx={{ border: 'solid red' }}>
        <Autocomplete
          sx={{ width: '170px' }}
          id='movieSearch'
          freeSolo
          options={options}
          onInputChange={(e, newInputValue) => {
            handleOnInputChange(newInputValue);
            // if (newInputValue === '') {
            //   handleOnInputChange(newInputValue);
            // } else {
            //   handleSearch(newInputValue);
            // }
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
    </Box>
  );
}

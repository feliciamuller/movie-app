import errorImage from '../Images/gallery_slash_icon_244286.png';
import { Box, Button, Modal, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { Movie } from '../Models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getMoviesOnSearchById } from '../Data/api';

type SelectedMovieProps = {
  searchedMovie: Movie[] | undefined;
  input: string | undefined;
};

export const useFetchMoviesById = (query: number | undefined) => {
  return useQuery({
    queryFn: () => getMoviesOnSearchById(query), //hämtar från apifunktionen
    queryKey: [`searchById`, query], //används som identifikation för queryn
    enabled: !!query,
  });
};

export default function SelectedMovie(props: SelectedMovieProps) {
  // const { selected } = useParams<{ selected: string }>(); // behöver kolla upp denna
  const { searchedMovie, input } = props;
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>();
  const [selectedMovieId, setSelectedMovieId] = useState<number>();

  // //DETTA BLIR RESULTATET AV DET SOM VISAS NÄR MAN SÖKER
  console.log('input i selected', input);
  console.log('searched i selected', searchedMovie);

  const handleOpen = (movieId: number) => {
    setSelectedMovieId(movieId);
    const selected = searchedMovie?.find((movie) => movie.id === movieId);
    setSelectedMovie(selected);
    setOpen(true);
    //här borde jag anropa get by id för att kunna visa beskrivning av filmen
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Box>
      {searchedMovie && input && (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px' }}>
          {searchedMovie?.map((movie) => (
            <Paper
              key={movie.title}
              elevation={3}
              sx={{
                backgroundColor: 'transparent',
                width: '200px',
                height: 'auto',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ':hover': {
                  boxShadow: '0 2px 10px rgba(255, 255, 255, 0.5)',
                  transform: 'scale(1.05)',
                  transition: 'ease-in-out 0.3s',
                },
              }}
            >
              <Button onClick={() => handleOpen(movie.id)} style={{ borderRadius: '8px', padding: 0 }}>
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : errorImage}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              </Button>
            </Paper>
          ))}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.light',
                padding: 4,
                textAlign: 'center',
                borderRadius: '8px',
              }}
            >
              {selectedMovie && (
                <>
                  <Typography variant='h6' component='h2'>
                    {selectedMovie.title}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{selectedMovie.overview}</Typography>
                </>
              )}
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
}

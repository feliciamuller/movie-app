import React, { useEffect, useState } from 'react';
import { Movie } from '../Models/Movie';
import { useLocalStorage } from './shared/useLocalStorage';
import { Box, Button, Modal, Paper, Typography } from '@mui/material';

export default function MyLikedMovies() {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]); //här finns alla gillade filmer
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>();

  const { getItem } = useLocalStorage('likedMovies');

  useEffect(() => {
    setLikedMovies(getItem); //sätter likedMovies till det som är sparat i localstorage
  }, []);

  const handleOpen = (movieId: number) => {
    setSelectedMovieId(movieId);
    const selected = likedMovies?.find((movie) => movie.id === movieId);
    setSelectedMovie(selected);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovieId(null);
    setSelectedMovie(null);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.light',
        borderColor: 'background.border',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Typography
        variant='h4'
        component='h4'
        sx={{ textAlign: 'center', marginTop: 2, marginLeft: 2, marginRight: 2, textShadow: '#5b5b66 1px 0 10px' }}
      >
        Mina favoriter
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        {likedMovies?.map((movie) => (
          <div>
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
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '20200505_noimage.png'}
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
          </div>
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
    </Box>
  );
}

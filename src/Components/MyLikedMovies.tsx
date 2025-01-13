import { useEffect, useState } from 'react';
import { Movie } from '../Models/Movie';
import { useLocalStorage } from './shared/useLocalStorage';
import { Box, Button, Paper, Typography } from '@mui/material';
import errorImage from '../Images/gallery_slash_icon_244286.png';
import DescriptionModal from './shared/DescriptionModal';

export default function MyLikedMovies() {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]); //här finns alla gillade filmer
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>();
  // const [selectedMovieId, setSelectedMovieId] = useState<number | null>();

  const { getItem } = useLocalStorage('likedMovies');

  useEffect(() => {
    setLikedMovies(getItem); //sätter likedMovies till det som är sparat i localstorage
  }, [getItem]);

  const handleClick = (movieId: number) => {
    // setSelectedMovieId(movieId);
    const selected = likedMovies?.find((movie) => movie.id === movieId);
    setSelectedMovie(selected);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedMovieId(null);
    setSelectedMovie(null);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.dark',
        borderColor: 'background.border',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Typography variant='h4' component='h4' sx={{ textAlign: 'center', marginTop: 2, marginLeft: 2, marginRight: 2 }}>
        My favourite movies
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
              <Button onClick={() => handleClick(movie.id)} style={{ borderRadius: '8px', padding: 0 }}>
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
          </div>
        ))}
        <DescriptionModal selected={selectedMovie} modalOpen={open} setModalClosed={handleClose} />
      </Box>
    </Box>
  );
}

import { useQuery } from '@tanstack/react-query';
import { getPopularMovies, getUpcomingMovies } from '../Data/api';
import Carousel from 'react-bootstrap/Carousel';
import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { Movie } from '../Models/Movie';
import Grid from '@mui/material/Grid2';

const useFetchMovies = () => {
  return useQuery({
    queryFn: () => getUpcomingMovies(), //hämtar från apifunktionen
    queryKey: ['upcomingMovies'], //används som identifikation för queryns
  });
};

const useFetchPopularMovies = () => {
  return useQuery({
    queryFn: () => getPopularMovies(),
    queryKey: ['popularMovies'],
  });
};

export default function Home() {
  const { data: movie } = useFetchMovies();
  const { data: popularMovies } = useFetchPopularMovies();
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>();

  const handleOpen = (movieId: number) => {
    setSelectedMovieId(movieId);
    const selected = popularMovies?.find((movie) => movie.id === movieId);
    setSelectedMovie(selected);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovieId(null);
    setSelectedMovie(null);
  };

  const groupedMovies = [];
  if (movie?.length) {
    for (let i = 0; i < movie.length; i += 5) {
      groupedMovies.push(movie?.slice(i, i + 5));
    }
  }
  const topFivePopular = popularMovies?.slice(0, 5);

  //SKULLE BEHÖVA FIXA RESPONSIVITET PÅ CAROUSEL, LÄGGA TILL GRID ITEMS
  return (
    <Box
      sx={{
        bgcolor: 'background.light',
        display: 'flex',
        flexDirection: 'column',
        borderColor: 'background.border',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 2,
        }}
      >
        <div style={{ width: '100%' }}>
          <Typography variant='h4' component='h4' style={{ textAlign: 'center', textShadow: '#5b5b66 1px 0 10px' }}>
            Upcoming movies
          </Typography>
          <Grid container spacing={2} justifyContent='center'>
            <Carousel indicators={false} style={{ display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center', width: '100%' }}>
              {groupedMovies.map((group, index) => (
                <Carousel.Item key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                    {group.map((movieItem) => (
                      <Paper
                        key={movieItem.title}
                        elevation={4}
                        id='MuiPaper-root'
                        sx={{
                          height: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 2,
                        }}
                      >
                        <img
                          className='movieImages'
                          src={movieItem.poster_path ? `https://image.tmdb.org/t/p/w500${movieItem.poster_path}` : '20200505_noimage.png'}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '20200505_noimage.png';
                          }}
                          alt={movieItem.title}
                        />
                        <Typography variant='h6' component='h6'>
                          Released: {movieItem.release_date}
                        </Typography>
                      </Paper>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Grid>
        </div>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <div style={{ width: '100%' }}>
          <Typography variant='h4' component='h4' style={{ textAlign: 'center', textShadow: '#5b5b66 1px 0 10px' }}>
            Popular right now
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center' }}>
            {topFivePopular?.map((movie) => (
              <div key={movie.title}>
                <Paper
                  elevation={3}
                  sx={{
                    height: 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
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
                      style={{ width: '100%', height: '100%', borderRadius: '8px' }}
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
        </div>
      </Box>
    </Box>
  );
}

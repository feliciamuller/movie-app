import { useQuery } from '@tanstack/react-query';
import { getTopRatedMovies } from '../Data/api';
import { useEffect, useState, useRef } from 'react';
import { Movie } from '../Models/Movie';
import Grid from '@mui/material/Grid2';
import { useLocalStorage } from './shared/useLocalStorage';
import Heart from 'react-heart';
import errorImage from '../Images/gallery_slash_icon_244286.png';
import { Box, Pagination, Rating, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/Star';

export const useFetchTopRated = (query: number | undefined) => {
  return useQuery({
    queryFn: () => getTopRatedMovies(query), //hämtar från apifunktionen
    queryKey: [`topRatedPage`, query], //används som identifikation för queryn
    enabled: !!query,
  });
};

export default function TopRatedMovies() {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]); //här finns alla gillade filmer
  const [userInputPage, setUserInputPage] = useState<number | undefined>(1);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);

  const { setItem: setLikedLocalStorage, getItem: getLikedLocalStorage } = useLocalStorage('likedMovies');
  const { setItem: setRatedLocalStorage, getItem: getRatedLocalStorage } = useLocalStorage('ratedMovies');

  const getItemRefLiked = useRef(getLikedLocalStorage);
  const getItemRefRated = useRef(getRatedLocalStorage);

  const { data: movie } = useFetchTopRated(userInputPage);

  useEffect(() => {
    const savedLikedMovies = getItemRefLiked.current();
    if (savedLikedMovies) {
      setLikedMovies(savedLikedMovies);
    }
    // Hämta sparade betygsatta filmer från localStorage
    const savedRatedMovies = getItemRefRated.current();
    if (savedRatedMovies) {
      setRatedMovies(savedRatedMovies);
    }
  }, []);

  const handleClick = (movie: Movie) => {
    setLikedMovies((prev) => {
      const isLiked = prev.some((item) => item.id === movie.id);
      let updatedLikedMovies;

      if (isLiked) {
        updatedLikedMovies = prev.filter((item) => item.id !== movie.id); // Ta bort filmen om den är gillad
      } else {
        updatedLikedMovies = [...prev, { ...movie, liked: true }]; // Lägg till filmen som gillad
      }

      //sparar i localstorage
      setLikedLocalStorage(updatedLikedMovies);
      return updatedLikedMovies;
    });
  };

  const handleRating = (movie: Movie, newRating: number) => {
    setRatedMovies((prev) => {
      const existingMovie = prev.find((item) => item.id === movie.id);
      let updatedRatedMovies;
      if (existingMovie) {
        updatedRatedMovies = prev.map((item) => (item.id === movie.id ? { ...item, rating: newRating } : item));
      } else {
        updatedRatedMovies = [...prev, { ...movie, rating: newRating }];
      }

      setRatedLocalStorage(updatedRatedMovies);
      return updatedRatedMovies;
    });
  };
  const moviesWithRating = movie?.map((movie) => {
    const ratedMovie = ratedMovies.find((item) => item.id === movie.id);
    return { ...movie, rating: ratedMovie?.rating ?? 0 }; // Lägg till rating om det finns, annars sätt till 0
  });
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '100%', padding: 2 }}>
          <Typography variant='h4' component='h4' style={{ textAlign: 'center' }}>
            Top rated
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent='center'>
          {moviesWithRating?.map((mov) => {
            const isLiked = likedMovies.some((item) => item.id === mov.id);
            const currentRating = ratedMovies.find((item) => item.id === mov.id)?.rating ?? 0;
            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={mov.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    borderColor: 'background.border',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    textAlign: 'left',
                    padding: 2,
                    overflow: 'hidden',
                    height: '700px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    backgroundColor: 'background.dark',
                  }}
                >
                  <img
                    style={{
                      maxWidth: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'cover',
                      alignSelf: 'center',
                    }}
                    className='movieImages'
                    src={mov.backdrop_path ? `https://image.tmdb.org/t/p/w500${mov.backdrop_path}` : errorImage}
                    alt={mov.title}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'flex-start',
                      mb: 2,
                      mt: 2,
                    }}
                  >
                    <Typography variant='h6' sx={{ flex: 1, textAlign: 'left', flexShrink: 0 }}>
                      <strong>{mov.title}</strong>
                    </Typography>
                    <Heart
                      style={{ width: '1.7rem' }}
                      isActive={isLiked}
                      onClick={() => handleClick(mov)}
                      activeColor='#850808'
                      inactiveColor='#ECDFCC'
                    />
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      overflow: 'auto', // denna ska stylas snyggare
                      mb: 2,
                    }}
                  >
                    <Typography variant='body1' component='p' sx={{ alignSelf: 'flex-start' }}>
                      {mov.overview} <br />
                      Released: {mov.release_date}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                  >
                    <Rating
                      sx={{ color: '#f3ce13' }}
                      name='simple-controlled'
                      value={currentRating}
                      onChange={(_e, rating) => handleRating(mov, rating ?? 0)}
                      emptyIcon={<StarBorderIcon style={{ color: '#1E1E20' }} fontSize='inherit' />}
                    />
                    <Typography variant='body1' component='p' sx={{ color: '#f3ce13', width: '100%', textAlign: 'center' }}>
                      <strong>IMDb: {Math.round(mov.vote_average * 10) / 10}</strong>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Grid container justifyContent='center' sx={{ padding: 2 }}>
        <Pagination
          color='primary'
          count={10}
          onChange={(_e, page) => {
            if (page) {
              setUserInputPage(page);
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }
          }}
        />
      </Grid>
    </Box>
  );
}

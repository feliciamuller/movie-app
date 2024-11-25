import { useQuery } from '@tanstack/react-query';
import { getTopRatedMovies } from '../Data/api';
import { useEffect, useState, useRef } from 'react';
import { Movie } from '../Models/Movie';
import Grid from '@mui/material/Grid2';
import { useLocalStorage } from './shared/useLocalStorage';
import Heart from 'react-heart';
import errorImage from '../Images/gallery_slash_icon_244286.png';
import { Box, Button, Pagination, Rating, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/Star';

export const useFetchTopRated = (query: number | undefined) => {
  return useQuery({
    queryFn: () => getTopRatedMovies(query), //hämtar från apifunktionen
    queryKey: [`topRatedPage`, query], //används som identifikation för queryn
    enabled: !!query,
  });
};
//HÄR SKA ALLA FILMER VISAS OCH DETALJER OM FILMEN
export default function TopRatedMovies() {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]); //här finns alla gillade filmer
  const [userInputPage, setUserInputPage] = useState<number | undefined>(1); //lär ska börja med 1 eftersom första sidan ska visas som default
  const [rating, setRating] = useState<number | undefined>(0); // behöver sätta så
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);

  const { setItem: setLikedLocalStorage, getItem: getLikedLocalStorage } = useLocalStorage('likedMovies');
  const { setItem: setRatedLocalStorage, getItem: getRatedLocalStorage } = useLocalStorage('ratedMovies');

  const getItemRefLiked = useRef(getLikedLocalStorage);
  const getItemRefRated = useRef(getRatedLocalStorage);

  console.log('rated i localstorage', ratedMovies); // detta blir senaste ratingen, typeof number. skillnaden mot likedMovies är att den sparar hela objektet inte bara liked

  const { data: movie } = useFetchTopRated(userInputPage);

  useEffect(() => {
    const savedLikedMovies = getItemRefLiked.current();
    if (savedLikedMovies) {
      setLikedMovies(savedLikedMovies);
    }

    const savedRatedMovies = getItemRefRated.current();
    if (savedRatedMovies) {
      setRatedMovies(savedRatedMovies); //blir senaste ratingen i siffra bara
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

  console.log('ratingen', rating);
  //RATING SPARAS INTE PÅ MOVIE
  const handleRating = (input: number, id: number) => {
    console.log('ID', id);
    console.log(
      'Movie',
      movie?.some((item) => item.id === id),
    );

    let ratingOnMovie;

    if (movie?.some((item) => item.id === id)) {
      console.log('Rating sätts');
      setRating(input);
      setRatedLocalStorage(input);
    } else {
      console.log('Rating sattes inte');
    }
  };
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
          <Typography variant='h4' component='h4' style={{ textAlign: 'center', textShadow: '#5b5b66 1px 0 10px' }}>
            Top rated
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent='center'>
          {movie?.map((mov) => {
            const isLiked = likedMovies.some((item) => item.id === mov.id); //denna fungerar och isLiked innehåller rätt film som är gillad

            console.log('ratedmovies', ratedMovies); // blir bara siffan på ratingen
            // console.log('Rating', rating);
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
                    bgcolor: 'background.light',
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
                    backgroundColor: 'background.default',
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
                      // height: '80px',
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
                      value={mov.rating} //är 0 första renderingen
                      onChange={(e, rating) => handleRating(rating, mov.id)}
                      emptyIcon={<StarBorderIcon style={{ color: '#1e1e22' }} fontSize='inherit' />}
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
          onChange={(e, page) => {
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

import { Movie } from '../Models/Movie';
import axios from 'axios';

//DENNA SKA GÖMMAS SENARE
const apiKey = 'acd6ce9ab6f292e227b895f58ded1c5f';

//Endpoint for discover movies
export const getMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
  return response.data.results;
};

export const getTopRatedMovies = async (queryNumber: number | undefined): Promise<Movie[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?page=${queryNumber}&api_key=${apiKey}`);
  //HÄR FINNS MER DATA ATT HÄMTA FRÅN PAGES - kolla på vid tid över
  return response.data.results;
};

//Endpoint for upcoming movies
export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
  //HÄR FINNS MER DATA ATT HÄMTA FRÅN PAGES - kolla på vid tid över
  return response.data.results;
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  //HÄR FINNS MER DATA ATT HÄMTA FRÅN PAGES - kolla på vid tid över
  return response.data.results;
};

export const getMoviesOnSearch = async (queryString: string | undefined): Promise<Movie[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${queryString}&api_key=${apiKey}`);
  //HÄR FINNS MER DATA ATT HÄMTA FRÅN PAGES - kolla på vid tid över
  return response.data.results;
};

export const getMoviesOnSearchById = async (id: number | undefined): Promise<Movie[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie/${id}&api_key=${apiKey}`);
  //HÄR FINNS MER DATA ATT HÄMTA FRÅN PAGES - kolla på vid tid över
  return response.data.results;
};

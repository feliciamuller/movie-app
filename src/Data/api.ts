import { useLocalStorage } from '../Components/shared/useLocalStorage';
import { Movie } from '../Models/Movie';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

export const getRequestToken = async (): Promise<string> => {
  const response = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`);
  console.log('Token från apiet', response.data.request_token);
  return response.data.request_token;
};

export const postSessionId = async (requestToken: string | undefined): Promise<string | undefined> => {
  const response = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`);
  console.log('PostSession', response.data.session_id);
  return response.data.session_id;
};

export const deleteSessionId = async (sessionId: string | undefined): Promise<string | undefined> => {
  const response = await axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}&session_id=${sessionId}`);
  return response.data.results;
};
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

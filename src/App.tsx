import './Styling/Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import TopRatedMovies from './Components/TopRatedMovies';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Components/shared/theme';
import MyLikedMovies from './Components/MyLikedMovies';
import DefaultSearchPage from './Components/DefaultSearchPage';
import { Box } from '@mui/material';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Router>
          <Box>
            <Navbar />
            <Routes>
              <Route path='/movie-app/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/topRated' element={<TopRatedMovies />} />
              <Route path='/myFavourites' element={<MyLikedMovies />} />
              <Route path='/search' element={<DefaultSearchPage />} />
            </Routes>
          </Box>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

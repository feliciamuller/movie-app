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

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/topRatedMovies' element={<TopRatedMovies />} />
            <Route path='/myLikedMovies' element={<MyLikedMovies />} />
            <Route path='/search' element={<DefaultSearchPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

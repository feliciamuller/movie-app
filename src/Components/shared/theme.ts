import { createTheme, TypeBackground } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ECDFCC;', //beige
    },
    secondary: {
      main: '#a89f90', //mörkare beige
    },
    error: {
      main: '#850808',
    },
    background: <TypeBackground>{
      default: '#3e3e46', //mörk lila/grå
      paper: '#606068', //ljusare lila/grå
      light: '#2E2E36', // lite ljusare nyans av default
      border: '#27272E',
    },
  },
  typography: {
    fontFamily: ['Josefin Sans', 'cursive'].join(','),
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h6',
          subtitle2: 'h6',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});

/* v8 ignore start */
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#095f59",
      light: "rgb(249, 232, 171)",
    },
    secondary: {
      main: "#fdcf6e",
      light: "rgb(249, 232, 171)",
    },
  },
  spacing: 12,
  
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '2rem',
          padding: '2rem',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          // border: '1px solid #ffd661',
        },
      },
      defaultProps: {
        component: 'article',
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        },
      },
      defaultProps: {
        titleTypographyProps: {
          variant: 'h2',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '& h2, & p': {
            margin: 0,
          },
        },
      },
      defaultProps: {
        component: 'section',
      },
    },
    MuiButton: {
      defaultProps: {
        component: 'button',
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '2rem',
          fontWeight: 'bold',
        },
        h2: {
          fontSize: '2rem',
        },
        body1: {
          fontSize: '1rem',
          margin: 0,
        },
      },
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
          body1: 'p',
          body2: 'p',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          //borderRadius: '2rem',
          //padding: '2rem',
          background: '#fff',
          // border: '1px solid #ffd661',
        },
      },
      defaultProps: {
        component: 'section',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
/* v8 ignore stop */
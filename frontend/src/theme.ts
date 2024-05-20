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
  /*
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
          border: '1px solid #ffd661',
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
    MuiCardActions: {
      styleOverrides: {
        root: {
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          '& .btn, & .btn-disabled': {
            padding: '0.5rem 1rem',
            border: 'none',
            background: '#095f59',
            borderRadius: '0.3rem',
            color: '#fff',
            '&:hover': {
              opacity: 0.8,
            },
            '&.btn-disabled': {
              opacity: 0.5,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          //padding: '1.3rem 2.6rem',
          border: 'none',
          color: '#fff',
          fontSize: '1rem',
          //borderRadius: '2rem',
          backgroundColor: '#095f59',
          '&:hover': {
            backgroundColor: '#083d3b',
          },
        },
        contained: {
          '&:hover': {
            opacity: 0.8,
          },
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        },
      },
      defaultProps: {
        component: 'button',
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            border: 'none !important',
            outline: 'none',
          },
          '& #find-funding': {
            border: 'none',
            marginLeft: '1rem',
            backgroundColor: '#fffbef',
            width: '-moz-available',
          },
        },
      },
      defaultProps: {
        component: 'div',
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          border: '2px solid #095f59',
          display: 'flex',
          fontSize: '1rem',
          justifyContent: 'space-between',
          borderRadius: '3rem',
          padding: '0.5rem',
        },
      },
      defaultProps: {
        component: 'form',
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
          border: '1px solid #ffd661',
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
  */
});

export default theme;

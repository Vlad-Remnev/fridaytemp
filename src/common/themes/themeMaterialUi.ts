import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  // palette: {
  //   primary: {
  //     main: '#FFA500FF',
  //   },
  //   secondary: {
  //     main: '#000000',
  //   },
  // }
});

export const buttonStyles = {
  width: '100%',
  background: '#366EFF',
  boxShadow: '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
  borderRadius: '30px',
  marginTop: '30px',
  textTransform: 'none',
};

export const eyeStyles = {
  position: 'absolute',
  top: '20px',
  right: '10px',
};

export const findStyles = {
  position: 'absolute',
  top: '12px',
  right: '20px',
};
//Modal window
export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form.jsx';
const LoginPage = () => {
  const theme = useTheme();
  const isNoMobileScreens = useMediaQuery('(min-width:1000px)');

  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'
        textAlign='center'
      >
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          color='primary'
        >
          Sociable
        </Typography>
      </Box>
      <Box
        width={isNoMobileScreens ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight='500'
          variant='h5'
          sx={{ md: '1.5rem' }}
        ></Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;

import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkHistoryOutlined,
  LocalActivityOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { Box, Divider, useTheme, Typography } from '@mui/material';
import UserImage from '../../components/UserImage';
import FlexBetween from '../../components/WidgetWrapper';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useNavigate from 'react-router-dom';
import { response } from 'express';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const getUser = async () => {
    const response = await fetch(`http://localhost:1111/users/${userId}`, {
      method: 'GET',
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-dicable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    ocuupation,
    viewedProfile,
    imprestions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}

      <FlexBetween
        gap='0.5rem'
        pb='1.1rem'
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap='1rem'>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant='h4'
              color={dark}
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName}
              {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
          <ManageAccountsOutlined />
        </FlexBetween>
        <Divider />
        {/* SECOND ROW*/}
        <Box p='1rem 0'>
          <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
            <LocationOnOutlined fontSize='large' sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display='flex' alignItems='center' gap='1rem'>
            <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
            <Typography color={medium}>{ocuupation}</Typography>
          </Box>
        </Box>

        {/* THIRD  ROW */}

        <Box p='1rem 0'>
          <FlexBetween mb='0.5rem'>
            <Typography color={medium}>Who's your profile</Typography>
            <Typography color={main}>{viewedProfile}</Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Imipresstion of your post</Typography>
            <Typography color={main}>{main}</Typography>
          </FlexBetween>
        </Box>
        {/* FORTH ROW */}
        <Box p='1rem 0'>
          <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
            Social Profiles
          </Typography>
          <FlexBetween gap='1rem' mb='0.5rem'>
            <FlexBetween gap='1rem'>
              <img src='../../../public/assets/twitter.png' alt='twitter' />
              <Box>
                <Typography color={main} fontWeight='500'>
                  Witter
                </Typography>
                <Typography color={medium}> SocialNet</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

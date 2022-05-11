import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfileTabs = () => {
  const [value, setValue] = useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const toNavigate = (event: React.SyntheticEvent, link: string) => {
    navigate(link);
  };

  return (
    <Box sx={{ width: '100%', mt: '20px' }}>
      <Tabs
        value={location.pathname}
        onChange={toNavigate}
        textColor='secondary'
        indicatorColor='secondary'
        aria-label='secondary tabs example'
      >
        <Tab value='/profile' label='Статьи' />
        <Tab value='/profile/comments' label='Комментарии' />
        <Tab value='/profile/drafts' label='Черновики' />
        <Tab value='/profile/donates' label='Донаты' />
        <Tab value='/profile/details' label='Подробнее' />
      </Tabs>
    </Box>
  );
};
export default ProfileTabs;
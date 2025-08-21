'use client'

import { Avatar, Box, Typography, Tabs, Tab, Tooltip } from '@mui/material'
import Link from 'next/link';
import { useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

interface IProps {
  followers: IUser;
}


function TabPanel(props: { children?: React.ReactNode, value: number, index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const Detail = ({ followers }: IProps) => {
  const [tab, setTab] = useState(2);


  return (
    <Box>

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${followers?.avatar}`}
          sx={{ width: 70, height: 70 }}
        />
        <Typography variant="h5" fontWeight="bold">
          {followers?.name}
        </Typography>
      </Box>


      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: 'white', border: '2px dashed', borderRadius: 5 } }}
      >
        <Tab label="Yêu thích" {...a11yProps(0)} />
        <Tab label="Theo dõi" {...a11yProps(1)} />
        <Tab label="Người theo dõi" {...a11yProps(2)} />
        <Tab label="Bạn bè" {...a11yProps(3)} />
      </Tabs>


      <TabPanel value={tab} index={0}>
        <Typography>Danh sách bài hát yêu thích đang được cập nhật...</Typography>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Typography>Danh sách người đang theo dõi đang được cập nhật...</Typography>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Box
          mt={2}
          display="flex"
          flexWrap="wrap"
          gap={4}
          justifyContent="flex-start"
        >
          {followers?.followers.map((user) => (
            <Box
              key={user._id}
              display="flex"
              flexDirection="column"
              alignItems="center"
              width={100}
              sx={{
                "a": {
                  textDecoration: 'unset',
                  color: 'unset',
                }
              }}
            >
              <Avatar
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${user.avatar}`}
                sx={{ width: 100, height: 100, fontSize: 40 }}
              />

              <Link href={`/detail/${user._id}`}>
                {user.name}
              </Link>

              {user.followers.length > 0 &&
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleAltIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">{user.followers.length}</Typography>
                </Box>
              }

              <Tooltip title={user.name}>
                <Typography
                  mt={1}
                  textAlign="center"
                  sx={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 500,
                    maxWidth: 100,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.name}
                </Typography>
              </Tooltip>
            </Box>
          ))}
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Typography>Danh sách bạn bè</Typography>
      </TabPanel>

    </Box>
  );
};

export default Detail;

'use client'
import { Avatar, Box, Typography, Tabs, Tab, Tooltip } from '@mui/material'
import { useState } from 'react';
import PlaylistItem from './playlist/user.playlist';
import HistoryItem from './history/user.history';
import GroupComponent from './group/user.group';
import ListGroup from './group/list.group';
import { checkRole } from '@/utils/function';
import { useSession } from 'next-auth/react';





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

interface IProps {
    tabStart: number;

}

const Playlist = ({ tabStart }: IProps) => {
    const [tab, setTab] = useState(tabStart);
    const { data: session } = useSession();
    const isNotAllowed = !session?.user || !checkRole(session.user.role);


    return (
        <Box>

            <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                textColor="inherit"
                TabIndicatorProps={{ style: { backgroundColor: 'white', border: '2px dashed', borderRadius: 5 } }}
            >
                <Tab label="Lịch sử" {...a11yProps(0)} />
                <Tab label="Danh sách yêu thích" {...a11yProps(1)} />
                <Tab label="Danh sách phát" {...a11yProps(2)} />

                <Tab label="Tạo Group" {...a11yProps(3)} disabled={isNotAllowed} />
                <Tab label="Danh sách Group" {...a11yProps(4)} disabled={isNotAllowed} />
            </Tabs>


            <TabPanel value={tab} index={0}>
                <HistoryItem />
            </TabPanel>

            <TabPanel value={tab} index={1}>
                Danh sách yêu thích
            </TabPanel>

            <TabPanel value={tab} index={2}>
                <PlaylistItem />
            </TabPanel>
            <TabPanel value={tab} index={3}>
                <GroupComponent setTab={setTab} />
            </TabPanel>
            <TabPanel value={tab} index={4}>
                <ListGroup />
            </TabPanel>
        </Box>
    );
};

export default Playlist;

'use client'
import { Avatar, Box, Typography, Tabs, Tab, Tooltip } from '@mui/material'
import { useState } from 'react';
import StepOne from './step/app.step1';
import StepSecond from './step/app.step2';




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

const UploadTrack = () => {
    const [tab, setTab] = useState(0);
    const [percent, setPercent] = useState(0);
    const [songUpload, setSongUpload] = useState({
        "name": '',
        "audio": '',
        "cover": '',
        "users": [],
        "genres": [],
        "state": 'confirm',
    })

    return (
        <Box>

            <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                textColor="inherit"
                TabIndicatorProps={{ style: { backgroundColor: 'white', border: '2px dashed', borderRadius: 5 } }}
            >
                <Tab label="Bài hát" {...a11yProps(0)}
                    disabled={tab !== 0}
                />
                <Tab label="Thông tin chi tiết" {...a11yProps(1)}
                    disabled={tab !== 1}
                />
            </Tabs>


            <TabPanel value={tab} index={0}>
                <StepOne setTab={setTab} songUpload={songUpload} setSongUpload={setSongUpload} setPercent={setPercent} />
            </TabPanel>

            <TabPanel value={tab} index={1}>
                <StepSecond percent={percent} songUpload={songUpload} setSongUpload={setSongUpload} setTab={setTab} />
            </TabPanel>
        </Box>
    );
};

export default UploadTrack;

'use client';
import React, { useMemo, useState } from 'react';
import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Link as MuiLink,
    List,
    ListItem,
    ListItemText,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
    Button,
    Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import StarRateIcon from '@mui/icons-material/StarRate';

type Project = {
    title: string;
    linkFE?: string;
    linkBE?: string;
    image: string;
    description: string;
    video?: string;
    tech: string[];
    features: string[];
};

const projects: Project[] = [
    {
        title: 'SoundCloud',
        linkFE: 'https://github.com/nguoitamamo/Web_CloudSound',
        linkBE: 'https://github.com/nguoitamamo/BE_nest_sound',
        image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/soundcloud.png`,
        description: 'Web Clone SoundCloud',
        video: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/soudcloud.mp4`,
        tech: ['Next.js - MUI (TypeScript)', 'NestJS', 'MongoDB', 'Socket.io', 'Stream-io'],
        features: [
            'Online music playback',
            'personal playlists',
            'search, favorites, history',
            'time-based comments',
            'fine-tuned Whisper for MP3 checking file mp3 upload and daily auto-run at midnight',
            'P2P WebRTC calls',
            'Stream-io for calls and screen sharing',
            'VIP upgrade',
            'real-time chat via Socket.io',
            'online payment with Sepay',
            'Chat real-time qua Socket.io',
            'AdminJS dashboard',
        ],
    },
    {
        title: 'Shopping App',
        linkFE: 'https://github.com/nguoitamamo/SanThuongMaiDienTu',
        linkBE: 'https://github.com/nguoitamamo/backend',
        image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/thuongmaidientu.png`,
        description: 'Shopping App.',
        video: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/thuongmaidientu.mp4`,
        tech: ['React Native - React Native Paper', 'Django Rest Framework', 'MySQL'],
        features: [
            'Search with filters',
            'OAuth2 authentication and authorization',
            'Product comments',
            'Shop ratings',
            'Monthly/weekly discounts by product/category',
            'featured suppliers and products',
            'cart (Redux)',
            'lazy loading'
        ],
    },
    {
        title: 'Chat HNT',
        linkFE: 'https://github.com/nguoitamamo/chat-socket',
        image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/chathnt.png`,
        description: 'Web chat bằng socket',
        video: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/chathnt.mp4`,
        tech: ['Next.js - Antd (TypeScript)', 'Express', 'MongoDB', 'Socket.io'],
        features: [
            'Chat real-time',
            'Clerk authentication',
            'Online user list',
            'Unread messages',
            'Group creation and group chat',
        ],
    },
    {
        title: 'High School Student Grade Management System',
        linkFE: 'https://github.com/nguoitamamo/quanlihocsinhfinal',
        image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/hethongquanlidiemhocsinh.png`,
        description: 'Web application for managing high school grades.',
        video: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/hethongquanlidiemhocsinh.mp4`,
        tech: ['HTML, CSS, Bootstrap 5', 'Flask', 'MySQL', 'Python'],
        features: [
            'Manage student grades & import student data (manually or from XLSX file)',
            'Validate student age',
            'Class assignment by score',
            'Teacher access control, temporary save before committing grades to the database',
            'Validate grade inputs',
        ],
    },
];

const techSkills = [
    'Python',
    'JavaScript',
    'TypeScript',
    'NestJS',
    'Express',
    'Next.js',
    'React & React Native',
    'Node.js RESTful API',
    'Flask, Django',
    'MySQL (SQL), SQL Server (SQL), MongoDB (NOSQL)',
    'Socket.io & WebRTC',
    'Stream-io',
    'Knowledge of software testing tools: Selenium, Postman',
    'Familiar with OOP, Data Structures & Algorithms, and Databases'

];

const softSkills = [
    'GitHub workflow (CI/CD)',
    'Basic knowledge of Docker',
    'Testing: Selenium, Postman',
    'Able to read and understand technical documents'
];

const bulletsAbout = [
    'Energetic, quick learner, with strong self-study skills',
    'Good listener, eager to learn, and passionate about sports',
    'item Presentable appearance',
    'Strong problem-solving skills using Google search.',
];

const Section = ({
    title,
    children,
    id,
    gutterTop = 6,
}: {
    title: string;
    children: React.ReactNode;
    id?: string;
    gutterTop?: number;
}) => (
    <Box id={id} sx={{ mt: gutterTop }}>
        <Typography
            variant="h6"
            fontWeight={800}
            sx={{
                letterSpacing: 0.5,
                mb: 1,
                background: 'linear-gradient(90deg, #0ea5e9 0%, #8b5cf6 60%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
            component={motion.h2}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
        >
            {title}
        </Typography>
        <Divider sx={{ mb: 2, borderColor: 'divider' }} />
        {children}
    </Box>
);

const GlassCard: React.FC<React.PropsWithChildren<{ sx?: any }>> = ({ children, sx }) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 10px 30px rgba(2, 8, 20, 0.04)',
            ...sx,
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </Paper>
);

const Portfolio: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Project | null>(null);
    const isDownMd = useMediaQuery('(max-width:900px)');

    const avatarSrc = `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/huynhngoctruong.jpg`;

    const handleOpen = (p: Project) => {
        setSelected(p);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSelected(null);
    };

    const heroGradient = useMemo(
        () =>
            `radial-gradient(1200px 600px at 10% -10%, rgba(14,165,233,0.15), transparent 60%),
       radial-gradient(1000px 500px at 90% -20%, rgba(139,92,246,0.14), transparent 60%),
       radial-gradient(900px 500px at 50% 0%, rgba(236,72,153,0.12), transparent 50%)`,
        []
    );

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: `linear-gradient(180deg, #f8fafc 0%, #f9fafb 100%)`,
            }}
        >
            {/* HERO */}
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: heroGradient,
                        pointerEvents: 'none',
                    }}
                />
                <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 8 } }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <GlassCard sx={{ textAlign: 'center' }}>
                                <Avatar
                                    src={avatarSrc}
                                    variant="rounded"
                                    sx={{
                                        width: { xs: 180, md: 220 },
                                        height: { xs: 240, md: 280 },
                                        mx: 'auto',
                                        mb: 2,
                                        boxShadow: '0 10px 30px rgba(2,8,20,0.15)',
                                    }}
                                />
                                <Stack direction="row" spacing={1} justifyContent="center">
                                    <Tooltip title="GitHub">
                                        <IconButton
                                            component={Link}
                                            href="https://github.com/nguoitamamo"
                                            target="_blank"
                                            rel="noopener"
                                            aria-label="GitHub"
                                        >
                                            <GitHubIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Website personal">
                                        <IconButton
                                            component={Link}
                                            href="https://huynhngoctruong.io.vn/profile"
                                            target="_blank"
                                            rel="noopener"
                                            aria-label="Website"
                                        >
                                            <LanguageIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </GlassCard>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <GlassCard>
                                <Stack spacing={1}>
                                    <Typography variant={isDownMd ? 'h4' : 'h3'} fontWeight={900}>
                                        HUYNH NGOC TRUONG
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        sx={{
                                            background:
                                                'linear-gradient(90deg, #0ea5e9 0%, #22c55e 45%, #f59e0b 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        INFORMATION TECHNOLOGY INTERN
                                    </Typography>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={1.5}
                                        divider={<Divider orientation="vertical" flexItem />}
                                        sx={{ color: 'text.secondary', mt: 1 }}
                                    >
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <PlaceIcon fontSize="small" />
                                            <Typography>TP HO CHI MINH</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <EmailIcon fontSize="small" />
                                            <MuiLink href="mailto:huynhngoctruongg@gmail.com">
                                                huynhngoctruongg@gmail.com
                                            </MuiLink>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CalendarMonthIcon fontSize="small" />
                                            <Typography>18-07-2004</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <PhoneIphoneIcon fontSize="small" />
                                            <MuiLink href="tel:0352175924">0352175924</MuiLink>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </GlassCard>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 10 }}>
                {/* ABOUT */}
                <Section title="ABOUT ME" id="about">
                    <GlassCard>
                        <List dense>
                            {bulletsAbout.map((b, i) => (
                                <ListItem key={i} sx={{ alignItems: 'flex-start' }}>
                                    <ListItemText
                                        primaryTypographyProps={{ variant: 'body1' }}
                                        primary={`• ${b}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </GlassCard>
                </Section>

                {/* EDUCATION */}
                <Section title="EDUCATION" id="education" gutterTop={5}>
                    <GlassCard>
                        <Typography variant="h6" fontWeight={800}>
                            INFORMATION TECHNOLOGY
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={800} sx={{ mt: 0.5 }}>
                            HO CHI MINH CITY OPEN UNIVERSITY • 2022 – 2026
                        </Typography>
                    </GlassCard>
                </Section>

                {/* SKILLS */}
                <Section title="SKILL" id="skills" gutterTop={5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <GlassCard>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                    <TerminalIcon />
                                    <Typography variant="subtitle1" fontWeight={800}>
                                        TECHNICAL SKILLS
                                    </Typography>
                                </Stack>
                                <Stack direction="row" gap={1} useFlexGap flexWrap="wrap">
                                    {techSkills.map((s) => (
                                        <Chip
                                            key={s}
                                            label={s}
                                            variant="outlined"
                                            sx={{ borderRadius: 2 }}
                                        />
                                    ))}
                                </Stack>
                            </GlassCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <GlassCard>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                    <CodeIcon />
                                    <Typography variant="subtitle1" fontWeight={800}>
                                        SOFT SKILLS
                                    </Typography>
                                </Stack>
                                <Stack direction="row" gap={1} useFlexGap flexWrap="wrap">
                                    {softSkills.map((s) => (
                                        <Chip
                                            key={s}
                                            label={s}
                                            color="default"
                                            variant="outlined"
                                            sx={{ borderRadius: 2 }}
                                        />
                                    ))}
                                </Stack>
                            </GlassCard>
                        </Grid>
                    </Grid>
                </Section>

                {/* PROJECTS */}
                <Section title="PROJECTS" id="projects" gutterTop={5}>
                    <Grid container spacing={3}>
                        {projects.map((p) => (
                            <Grid key={p.title} item xs={12} sm={6} md={4}>
                                <Card
                                    component={motion.div}
                                    whileHover={{ y: -6 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                                    sx={{
                                        height: '100%',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(2,8,20,0.06)',
                                    }}
                                >
                                    <CardActionArea onClick={() => handleOpen(p)}>
                                        <CardMedia
                                            component="img"
                                            height="160"
                                            image={p.image}
                                            alt={p.title}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight={800}>
                                                {p.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {p.description}
                                            </Typography>
                                            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                                                {p.tech.slice(0, 3).map((t) => (
                                                    <Chip key={t} label={t} size="small" sx={{ borderRadius: 2 }} />
                                                ))}
                                                {p.tech.length > 3 && (
                                                    <Chip
                                                        size="small"
                                                        label={`+${p.tech.length - 3}`}
                                                        sx={{ borderRadius: 2 }}
                                                    />
                                                )}
                                            </Stack>
                                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                                <Button
                                                    size="small"
                                                    startIcon={<PlayCircleOutlineIcon />}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOpen(p);
                                                    }}
                                                >
                                                    Demo
                                                </Button>
                                                {p.linkFE && (
                                                    <Button
                                                        size="small"
                                                        component={Link}
                                                        href={p.linkFE}
                                                        target="_blank"
                                                        rel="noopener"
                                                        startIcon={<GitHubIcon />}
                                                    >
                                                        FE
                                                    </Button>
                                                )}
                                                {p.linkBE && (
                                                    <Button
                                                        size="small"
                                                        component={Link}
                                                        href={p.linkBE}
                                                        target="_blank"
                                                        rel="noopener"
                                                        startIcon={<GitHubIcon />}
                                                    >
                                                        BE
                                                    </Button>
                                                )}
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Modal Project Detail */}
                    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                        {selected && (
                            <>
                                <DialogTitle sx={{ fontWeight: 800 }}>{selected.title}</DialogTitle>
                                <DialogContent dividers>
                                    {/* Prefer <video> for mp4; fallback to iframe */}
                                    {selected.video && selected.video.endsWith('.mp4') ? (
                                        <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
                                            <video
                                                src={selected.video}
                                                controls
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    borderRadius: 12,
                                                    outline: 'none',
                                                }}
                                            />
                                        </Box>
                                    ) : selected.video ? (
                                        <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
                                            <iframe
                                                src={selected.video}
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    border: 0,
                                                    borderRadius: 12,
                                                }}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            />
                                        </Box>
                                    ) : null}

                                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
                                        {selected.linkFE && (
                                            <Button
                                                component={Link}
                                                href={selected.linkFE}
                                                target="_blank"
                                                rel="noopener"
                                                startIcon={<GitHubIcon />}
                                                variant="outlined"
                                            >
                                                Frontend
                                            </Button>
                                        )}
                                        {selected.linkBE && (
                                            <Button
                                                component={Link}
                                                href={selected.linkBE}
                                                target="_blank"
                                                rel="noopener"
                                                startIcon={<GitHubIcon />}
                                                variant="outlined"
                                            >
                                                Backend
                                            </Button>
                                        )}
                                    </Stack>

                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1 }}>
                                        Technology Stack
                                    </Typography>
                                    <Stack direction="row" gap={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                                        {selected.tech.map((t) => (
                                            <Chip key={t} label={t} variant="outlined" sx={{ borderRadius: 2 }} />
                                        ))}
                                    </Stack>

                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1 }}>
                                        Key Features
                                    </Typography>
                                    <List dense>
                                        {selected.features.map((f, idx) => (
                                            <ListItem key={idx} sx={{ alignItems: 'flex-start' }}>
                                                <ListItemText primary={`• ${f}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </DialogContent>
                            </>
                        )}
                    </Dialog>
                </Section>

                {/* GOAL */}
                <Section title="CAREER OBJECTIVES" id="career" gutterTop={5}>
                    <GlassCard>
                        <List dense>
                            {[
                                'Gain hands-on experience before graduation.',
                                'Learn and understand real-world workflows.',
                                'Strive to become a full-time employee in the company.',
                            ].map((g, i) => (
                                <ListItem key={i} sx={{ alignItems: 'flex-start' }}>
                                    <ListItemText primary={`• ${g}`} />
                                </ListItem>
                            ))}
                        </List>
                    </GlassCard>
                </Section>

            </Container>
        </Box>
    );
};

export default Portfolio;

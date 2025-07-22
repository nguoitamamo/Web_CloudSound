'use client'


import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import { Divider, ListItemIcon, TextField } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { useSession, signIn, signOut } from "next-auth/react"

import { useRouter } from 'next/navigation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import HistoryIcon from '@mui/icons-material/History';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '300px'
        },


    },
}));

export default function Header() {
    const { data: session } = useSession();

    const [content, setContent] = React.useState('');
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
        >
            <MenuItem
                sx={{
                    "a": {
                        textDecoration: 'unset',
                        color: 'unset'
                    }
                }}>
                <Avatar />
                <Link href={`/profile/${session?.user?._id}`}>Trang cá nhân</Link>
            </MenuItem>
            <Divider />
            <MenuItem
                sx={{
                    "a": {
                        textDecoration: 'unset',
                        color: 'unset'
                    }
                }}
            >
                <PlaylistAddIcon sx={{ mr: 1 }} />

                <Link href={`/utils/${2}`}  >
                    Danh sách phát</Link>
            </MenuItem>
            <MenuItem
                sx={{
                    "a": {
                        textDecoration: 'unset',
                        color: 'unset'
                    }
                }}>

                <FavoriteBorderIcon fontSize="small" sx={{ mr: 1 }} />
                <Link href={`/utils/${1}`}  >
                    Danh sách yêu thích</Link>

            </MenuItem>
            <MenuItem
                sx={{
                    "a": {
                        textDecoration: 'unset',
                        color: 'unset'
                    }
                }}>

                <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
                <Link href={`/utils/${0}`}  >
                    Lịch sử</Link>

            </MenuItem>

            <MenuItem
                sx={{
                    "a": {
                        textDecoration: 'unset',
                        color: 'unset'
                    }
                }} >
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                <Link href={`/utils/${4}`} >
                    Group</Link>


            </MenuItem>

            <MenuItem
                onClick={() => signOut()}
            >
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    return (

        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <AppBar position="static" sx={{ background: 'white', color: 'black', border: '2px dashed', borderRadius: '5px' }}>

                    <Toolbar>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: {
                                    xs: 'none', sm: 'block',
                                    "> a": {
                                        color: 'unset',
                                        textDecoration: 'unset'
                                    }
                                }
                            }}

                        >
                            <Link href="/" >SoundCloud</Link>
                        </Typography>
                        {/* <Search>
                            <SearchIconWrapper>
                                <SearchIcon onClick={() => alert("đã click")} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}

                            />
                        </Search> */}
                        <TextField
                            fullWidth
                            label="Tìm kiếm..."
                            value={content}
                            variant="standard"
                            sx={{ width: '40%', ml: 4, mb: 3 }}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    router.push(`/search/${content}`)

                                }
                            }}
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{
                            display:
                            {
                                xs: 'none',
                                md: 'flex'
                            },
                            alignItems: 'center',
                            gap: '15px',
                            "> a": {
                                color: 'unset',
                                textDecoration: 'unset'
                            },
                            cursor: 'pointer'
                        }}>
                            {session ?
                                <>
                                    <Link href={`/utils/${2}`}  >
                                        Danh sách phát</Link>
                                    <Link href="/track/upload">Upload</Link>
                                    <Link href={`/profile/${session?.user?._id}`}>{session?.user?.name}</Link>
                                    <Avatar sx={{ width: 32, height: 32 }} onClick={handleProfileMenuOpen}
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${session?.user?.avatar}`}
                                    />
                                </>
                                : <>
                                    <Link href={"/auth/signin"}

                                    >Đăng nhập</Link>
                                </>
                            }



                            {/* <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton> */}
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>

                </AppBar>
            </Container>
            {renderMobileMenu}
            {renderMenu}
        </Box>

    );
}

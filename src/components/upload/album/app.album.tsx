'use client'
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography,
    Paper,
} from '@mui/material';
import { sendRequest } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { AlbumsState, setAlbums } from '@/components/redux/albumsSlice';
import { useDispatch, useSelector } from 'react-redux';



const Album = () => {

    const { data: session } = useSession();

    // const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [albumName, setAlbumName] = useState('');


    const { albums }: AlbumsState = useSelector((state: any) => state.albums);

    const usedispath = useDispatch()

    // const handleAddAlbum = () => {
    //     

    //     setAlbums([newAlbum, ...albums]);
    //     setAlbumName('');
    // };

    useEffect(() => {
        const handleGetAlbumUser = async () => {
            const res = await sendRequest<IBackendRes<AlbumType[]>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/album/${session?.user?._id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`
                },
            })

            if (res?.data) {
                usedispath(setAlbums(res.data))
            }
        }
        handleGetAlbumUser();

    }, [])


    const handleAddAlbum = async () => {
        if (!albumName.trim()) return;

        const res = await sendRequest<IBackendRes<AlbumType>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/albums`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.user?.access_token}`
            },
            body: {
                name: albumName
            }

        })


        if (res?.data) {
            usedispath(setAlbums([res?.data, ...albums]));
            setAlbumName('');
        }
    }


    return (
        <Box sx={{ maxWidth: 500, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Tạo Album mới
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    label="Tên album"
                    fullWidth
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddAlbum();
                        }
                    }}
                />


                <Button variant="contained" color="primary" onClick={() => handleAddAlbum()} >
                    Tạo
                </Button>
            </Box>

            <Paper elevation={3}>
                <List>
                    {albums.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="Chưa có album nào." />
                        </ListItem>
                    ) : (
                        albums.map((album) => (
                            <ListItem key={album._id}>
                                <ListItemText primary={album.name} />
                            </ListItem>
                        ))
                    )}
                </List>
            </Paper>
        </Box>
    );
};

export default Album;

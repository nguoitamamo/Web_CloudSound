'use client'
import { Avatar, Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react"
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close'
import { useToast } from "@/components/lib/toast";
import { useDispatch, useSelector } from "react-redux";
import { GenresState, setGenres } from "@/components/redux/genresSlice";
import { AuthorsState, setAuthors } from "@/components/redux/authorsSlice";
import { AlbumsState, setAlbumID, setAlbums } from "@/components/redux/albumsSlice";

interface IProp {
    songUpload: {
        "name": string,
        "audio": string,
        "cover": string,
        "users": string[],
        "genres": string[],
        "state": string,
    }
    setSongUpload: (value: any) => void;
    percent: number;
    setTab: (value: number) => void;

}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
function InputFileUpload({
    songUpload,
    setSongUpload
}: {
    songUpload: IProp["songUpload"];
    setSongUpload: IProp["setSongUpload"]
}) {
    const { data: session } = useSession()
    return (
        <Button
            component="label"
            variant="contained"
            sx={{ background: 'black' }}
            startIcon={<CloudUploadIcon />}
        >
            Upload ảnh bìa
            <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={async (event) => {
                    const e = event.target as HTMLInputElement;
                    const file = e.files?.[0];
                    if (file) {
                        try {
                            const formData = new FormData();
                            formData.append('file', file);

                            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload/image`,
                                formData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${session?.user.access_token}`,
                                        'Content-Type': 'multipart/form-data',
                                        folder_type: 'song',
                                        type: 'image',
                                    }

                                }

                            )



                            setSongUpload({
                                ...songUpload,
                                cover: res?.data?.data?.fileName
                            });



                        }
                        catch (error) {
                            console.log(error);
                        }



                    }
                }}
            />
        </Button>
    );
}


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

const LinearWithValueLabel = ({ value }: { value: number }) => {
    return <LinearProgressWithLabel value={value} />;
};



const StepSecond = ({ songUpload, percent, setSongUpload, setTab }: IProp) => {

    const [checked, setChecked] = useState(false);

    // const { currentUserData }: UserState = useSelector((state: any) => state.user);


    const { authors }: AuthorsState = useSelector((state: any) => state.authors);
    const { genres }: GenresState = useSelector((state: any) => state.genres);
    const { albums, albumID }: AlbumsState = useSelector((state: any) => state.albums);



    const usedispath = useDispatch()

    // const authors = ['686e76717c55361f30426d66', 'Mỹ Tâm', 'Đen Vâu', 'Noo Phước Thịnh'];
    // const genres = ['Nhạc trẻ', 'Rock', 'Ballad', 'Rap', 'EDM'];
    const toast = useToast()
    const { data: session } = useSession()

    // const handleValidateSong = () => {
    //     if ( songUpload.name ==='')
    // }


    const handleSubmitCreateSong = async () => {


        const sendValidateSong = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.user.access_token}`,
            },
            body: {
                name: songUpload.name,
                audio: songUpload.audio,
                cover: songUpload.cover,
                users: songUpload.users,
                genres: songUpload.genres,
                isVip: checked,
                albumID: albumID,
                state: 'confirm',
            }
        })

        if (sendValidateSong?.statusCode === 201) {

            toast.success(sendValidateSong?.message);
            await new Promise(resolve => setTimeout(resolve, 3000));
            setTab(0);
        }
        else {
            toast.error(sendValidateSong?.message);
        }





    }



    const handleGetAllUser = async () => {
        const res = await sendRequest<IBackendRes<UserType[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`,
            method: "GET",
        })
        if (res?.data) {
            usedispath(setAuthors(res.data))
        }

    }

    const handleGetGenres = async () => {
        const res = await sendRequest<IBackendRes<Genre[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/genres`,
            method: "GET",
        })
        if (res?.data) {
            usedispath(setGenres(res.data))
        }

    }




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



    useEffect(() => {
        handleGetAllUser(),
            handleGetGenres(),
            handleGetAlbumUser()
    }, [])



    return (
        <Box sx={{ border: '2px dashed', padding: 10, borderRadius: 2 }}>
            <Typography variant="h6">{songUpload.audio}</Typography>
            <LinearWithValueLabel {...{ value: percent }} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 4
                }}
            >

                <Box sx={{ flex: 4, pr: 2 }}>
                    <div>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/song/${songUpload.cover}`}
                            alt="ảnh bìa cho bài hát"
                            style={{ width: 250, height: 250, borderRadius: 6 }}
                        />
                    </div>
                    <InputFileUpload songUpload={songUpload} setSongUpload={setSongUpload} />

                </Box>


                <Box sx={{ flex: 6, pl: 2 }}>
                    <TextField
                        label="Tên bài hát"
                        variant="outlined"
                        fullWidth
                        value={songUpload.name}
                        onChange={(e) =>
                            setSongUpload((prev: any) => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }
                        sx={{ mb: 2 }}
                    />


                    {/* <Typography sx={{ fontSize: 12, color: '#aaa' }}>
                        {songUpload?.users?.join(', ')}
                    </Typography> */}

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                        {songUpload?.users?.map((user, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    px: 1,
                                    py: 0.5,
                                    background: 'black',
                                    color: 'white',
                                    mb: 2
                                }}
                            >
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                    {user}
                                </Typography>
                                <CloseIcon
                                    fontSize="small"
                                    sx={{ cursor: 'pointer', color: '#888' }}
                                    onClick={() => {
                                        const updatedUsers = songUpload.users.filter((_, i) => i !== index);
                                        setSongUpload((prev: any) => ({
                                            ...prev,
                                            users: updatedUsers,
                                        }));
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Tác giả</InputLabel>
                        <Select
                            value={songUpload.users}
                            label="Tác giả"
                            onChange={
                                (e) => {

                                    setSongUpload((prev: any) => ({
                                        ...prev,
                                        users: [...prev.users, e.target.value]
                                    }));
                                }}

                        >
                            {authors?.map((a) => (
                                <MenuItem key={a._id} value={a._id}>
                                    {a.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                        {songUpload?.genres?.map((genre, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    px: 1,
                                    py: 0.5,
                                    background: 'black',
                                    color: 'white',
                                    mb: 2
                                }}
                            >
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                    {genre}
                                </Typography>
                                <CloseIcon
                                    fontSize="small"
                                    sx={{ cursor: 'pointer', color: '#888' }}
                                    onClick={() => {
                                        const updatedGenres = songUpload.genres.filter((_, i) => i !== index);
                                        setSongUpload((prev: any) => ({
                                            ...prev,
                                            genres: updatedGenres,
                                        }));
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>


                    <FormControl fullWidth>
                        <InputLabel>Thể loại</InputLabel>
                        <Select
                            value={songUpload.genres}
                            label="Thể loại"
                            onChange={(e) => {
                                setSongUpload((prev: any) => ({
                                    ...prev,
                                    genres: [...prev.genres, e.target.value]
                                }));
                            }}

                        >
                            {genres?.map((g) => (
                                <MenuItem key={g._id} value={g.name}>
                                    {g.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>





                    {/* <FormControl fullWidth>
                        <InputLabel>Album</InputLabel>
                        <Select
                            value={songUpload.genres}
                            label="Album"
                            onChange={(e) => {
                                setSongUpload((prev: any) => ({
                                    ...prev,
                                    genres: [...prev.genres, e.target.value]
                                }));
                            }}

                        >
                            {albums?.map((g) => (
                                <MenuItem key={g._id} value={g.name}>
                                    {g.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}

                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Album"
                        defaultValue="EUR"
                        sx={{ mt: 3, width: 200 }}
                        onChange={(e) => {
                            console.log(">> check album", e.target.value)
                            usedispath(setAlbumID(e.target.value));

                        }}
                    >
                        {albums.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={() =>
                                        setChecked(!checked)
                                    }
                                    inputProps={{ 'aria-label': 'controlled' }}

                                />} label="VIP" />

                    </FormGroup>


                    <Button sx={{ width: '160px', background: 'black', color: 'white', borderRadius: 2, mt: 7 }}
                        onClick={() => handleSubmitCreateSong()}
                    >
                        Lưu
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default StepSecond;

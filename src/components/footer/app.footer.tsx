// 'use client'
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
// import { AppBar, Box, Container } from "@mui/material";
// import UseHasMounted from '@/utils/customhook';
// import { useEffect, useRef, useState } from 'react';
// import { useSongContext } from '../track/context.wavetrack';

// const Footer = () => {
//     const hasMounted = UseHasMounted();
//     const audioRef = useRef<HTMLAudioElement | null>(null);
//     const { song, setSong } = useSongContext() as ISongContextCurrent;


//     useEffect(() => {
//         if (audioRef.current) {
//             //@ts-ignore
//             audioRef.current.play() ? audioRef.current.pause() : audioRef.current.play()
//         }

//     }, [song, song.isPlayCurrent]);


//     if (!hasMounted) return (<></>)

//     return (
//         <Box
//             sx={{
//                 "img": {
//                     width: '60px',
//                     height: '60px',
//                     borderRadius: '5px'
//                 }
//             }}>

//             <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: 'white', boxShadow: 'unset' }}>
//                 <Container sx={{
//                     display: 'flex', border: '2px dashed', color: 'black',
//                     borderRadius: '5px', justifyContent: 'center', gap: 20
//                 }}>

//                     <AudioPlayer
//                         // ref="audioRef"
//                         src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/audio/${song.audio}`}
//                         volume={0.5}
//                         style={{
//                             padding: 0,
//                             width: '700px',
//                             background: 'white',
//                             boxShadow: 'unset'


//                         }}
//                         ref={(player) => {

//                             if (player) {
//                                 audioRef.current = player.audio.current;
//                             }
//                         }}
//                     // onPlay={() => {
//                     //     setSong({ ...song, isPlayCurrent: true })

//                     // }}

//                     // onPause={() => {
//                     //     setSong({ ...song, isPlayCurrent: false })
//                     // }}
//                     // Try other props!
//                     />

//                     <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 20 }}>
//                         <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/song/${song.cover}`} alt="" />
//                         <div style={{ display: 'unset', alignItems: 'center' }}>
//                             <p>{song.name}</p>

//                             <div>
//                                 {song.users.map((username, index) => {
//                                     return (
//                                         <span key={index} >{username} </span>
//                                     )
//                                 })}
//                             </div>
//                         </div>

//                     </div>
//                 </Container>
//             </AppBar>

//         </Box >

//     )



// }
// export default Footer;
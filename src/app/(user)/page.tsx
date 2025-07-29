
import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Box, Container, Divider, Paper } from "@mui/material";
import Vip from "@/components/vip/app.vip";

import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route";
import HomeHistory from "@/components/history/home.history";



const HomePage = async () => {

  const session = await getServerSession(authOptions);
  const type = 'week';



  const songTrending = await sendRequest<IBackendRes<ISong[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/top/${type}`,
    method: "GET",
  })



  // _app.tsx hoặc trong component chính




  return (
    <Container >

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
      }}>


        <Box sx={{ flex: 7 }}>
          <MainSlider data={songTrending?.data ?? []} type={type} />
        </Box>
        <Box sx={{ flex: 3 }}>
          <Vip />
        </Box>
      </Box>
      <Divider></Divider>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
      }}>
        <Box sx={{ flex: 7 }}>
          <MainSlider data={songTrending?.data ?? []} type={type} />
        </Box>
        <Box sx={{ flex: 3 }}>
          <HomeHistory />
        </Box>
      </Box>
    </ Container >

  );


}

export default HomePage;

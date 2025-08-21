import SearchSongItem from "@/components/song/search/song.search";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";


const SearchSong = async (props: any) => {

    const { params } = props;

    const res = await sendRequest<IBackendRes<ISong[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/search?query=${params.slug}`,
        method: 'GET',
    })

    return (
        <Container sx={{ mt: 3 }}>
            <SearchSongItem data={res?.data ?? []} />
        </Container>
    )
}

export default SearchSong;
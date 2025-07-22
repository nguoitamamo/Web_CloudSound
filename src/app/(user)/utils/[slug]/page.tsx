import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Playlist from "@/components/user/profile/user.utilities";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";

const PlayListPage = async (props: any) => {

    const session = await getServerSession(authOptions);

    const { params } = props;
    console.log(">> Check params", params.slug)

    return (
        <Container>
            <Playlist tabStart={parseInt(params.slug) || 0} />
        </Container>
    )

}

export default PlayListPage;
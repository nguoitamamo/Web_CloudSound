import Detail from "@/components/user/app.detailuser";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";


const DetailUser = async (props: any) => {

    const { params } = props;

    const res = await sendRequest<IBackendRes<IUser>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${params.slug}`,
        method: 'GET',
    })
    
    
    

    return (
        <Container sx={{ mt: 3 }}>
            {res?.data && <Detail followers={res?.data ?? {}} />}
        </Container>
    )


}

export default DetailUser;
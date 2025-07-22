import UploadTrack from "@/components/upload/app.upload";
import { Container } from "@mui/material";

const Upload = () => {
    return (
        <Container
            sx={{
                mt: 3
            }}
        >
            <UploadTrack />
        </Container>
    )
}

export default Upload;
import SePayQR from "@/components/qr/app.qr"
import { Container } from "@mui/material";



const Payment = async () => {

    await new Promise(resolve => setTimeout(resolve, 1000));
    return (
        <Container sx={{ mt: 2 }}>
            <SePayQR />
        </Container>
    )
}

export default Payment;
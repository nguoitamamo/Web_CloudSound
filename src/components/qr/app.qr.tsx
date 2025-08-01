import React, { useState } from "react";
import {
    Button,
    Modal,
    Box,
    Typography,
    TextField
} from "@mui/material";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4
};

interface IProps {
    open: boolean,
    setOpen: (v: boolean) => void;
}

const QRPaymentModal = ({ open, setOpen }: IProps) => {

    const [amount, setAmount] = useState<string>("");
    const [qrUrl, setQrUrl] = useState<string>("");

    const account = "SO_TAI_KHOAN"; // ví dụ: "123456789"
    const bank = "NGAN_HANG";       // ví dụ: "VCB"
    const description = "NOI_DUNG"; // ví dụ: "Mua VIP"

    const handleSubmitBuyVip = () => {
        setOpen(true);
    };

    const handleGenerateQR = () => {
        const url = `https://qr.sepay.vn/img?acc=${account}&bank=${bank}&amount=${amount}&des=${encodeURIComponent(description)}`;
        setQrUrl(url);
    };

    return (
        <>
            <Button onClick={handleSubmitBuyVip}>Mua</Button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <Typography variant="h6" mb={2}>Nhập số tiền</Typography>
                    <TextField
                        fullWidth
                        type="number"
                        label="Số tiền"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={handleGenerateQR}
                        disabled={!amount}
                    >
                        Tạo mã QR
                    </Button>

                    {qrUrl && (
                        <Box mt={3} textAlign="center">
                            <Typography variant="subtitle1" mb={1}>Quét mã QR để thanh toán:</Typography>
                            <img src={qrUrl} alt="QR Code" style={{ width: 200 }} />
                        </Box>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default QRPaymentModal;

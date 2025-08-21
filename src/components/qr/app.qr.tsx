'use client'

import { Box, Grid, Typography, Paper, Button, MenuItem, Select, TextField, Container, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '../lib/toast';


const SePayQR = () => {

    const searchParams = useSearchParams();
    const des = searchParams.get('des');
    const amount = searchParams.get('amount');

    const router = useRouter();
    const toast = useToast()

    useEffect(() => {
        const checkTransaction = async () => {
            try {
                const res = await fetch('/api/bank-transaction');
                const data = await res.json();

                console.log(">> Check respone", data);

                if (data.transactions && Array.isArray(data.transactions)) {
                    const matched = data.transactions.find(
                        (tx: any) =>
                            Number(tx.amount_in) === Number(amount) &&
                            tx.transaction_content.includes(des)
                    );

                    if (matched) {
                        router.push('/');
                    }
                }
            } catch (error) {
                console.error('Failed to fetch transaction data:', error);
            }
        };

        checkTransaction();
    }, [amount, des, router]);






    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={2} component={Paper} elevation={2}>

                <Grid item xs={12} md={5}>


                    <Box sx={{ width: '100%', height: '100%', mb: 2 }}>
                        <Image
                            src={`/api/generate-qr?amount=${amount}&des=${des}`}
                            alt="QR Code"
                            width={200}
                            height={200}
                            style={{ margin: '0 auto' }}
                        />
                    </Box>


                </Grid>


                <Grid item xs={12} md={7}>
                    <Box sx={{ p: 2 }}>


                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="bold">
                                Ngân hàng: ACB
                            </Typography>

                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="bold">
                                Thụ hưởng: HUYNH NGOC TRUONG
                            </Typography>

                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="bold">
                                Số tài khoản: 21383651
                            </Typography>

                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="bold">
                                Nội dung: {des}
                            </Typography>

                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="bold">
                                Số tiền: {amount} VND
                            </Typography>

                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="bold">
                                Vui lòng giữ nguyên
                            </Typography>

                        </Box>




                    </Box>
                </Grid>
            </Grid>

            <Box textAlign="center" mt={5}>
                <CircularProgress />
                <Typography mt={2}>Đang kiểm tra giao dịch...</Typography>

            </Box>

        </Container>
    );
};

export default SePayQR;

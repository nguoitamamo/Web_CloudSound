'use client';
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QRPaymentModal from "../qr/app.qr";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { randomInt } from "crypto";
import { useToast } from "../lib/toast";

const Vip = () => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const [selectedVip, setSelectedVip] = useState<string>('VIP1');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const toast = useToast()
    const { data: session } = useSession()

    useEffect(() => {
        const fetchRoles = async () => {
            const res = await sendRequest<IBackendRes<IRole[]>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/allvip`,
                method: 'GET',
            });

            if (res?.data) {
                setRoles(res.data);
                setSelectedVip(res.data[0]?.name || '');
            }
        };

        fetchRoles();
    }, []);



    const selectedRole = roles.find(role => role.name === selectedVip);


    const handleOnClickMua = async () => {
        const content = '482778abee0344618eb6acb5079ea310';
        try {
            const res = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`
                },
                body: {
                    transaction_content: content,
                    user: session?.user._id
                }
            });

            if (res?.statusCode === 201) {
                router.push(`/payment/${content}?des=${content}&amount=${selectedRole?.money}`);

            } else {
                toast.error('Đã xảy ra lỗi tạo thanh toán!');
            }
        } catch (err) {
            console.error(err);

        }


    };


    return (
        <Box sx={{ mt: 3 }}>
            <Box
                sx={{
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                    gap: 2,
                }}
            >
                {roles.map((role) => (
                    <Button
                        key={role._id}
                        onClick={() => setSelectedVip(role.name)}
                        variant={selectedVip === role.name ? 'contained' : 'outlined'}
                        sx={{
                            color: selectedVip === role.name ? 'white' : 'black',
                            backgroundColor: selectedVip === role.name ? 'black' : 'white',
                            borderColor: 'black',
                            borderRadius: '5px',
                            height: '50px',
                            width: '80px',
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        {role.name}
                    </Button>
                ))}
            </Box>

            <Box
                sx={{
                    padding: 5,
                    mt: 5,
                    border: '2px dashed',
                    borderRadius: '10px',
                    minHeight: '200px',
                }}
            >
                {selectedRole?.permissions.map((permission) => (
                    <Typography key={permission._id} variant="body1" sx={{ mb: 1 }}>
                        • {permission.name}
                    </Typography>
                ))}

                <Button variant="contained" onClick={handleOnClickMua} sx={{ mt: 2, background: 'black', color: 'white' }}>
                    Mua
                </Button>
            </Box>
        </Box>
    );
};

export default Vip;

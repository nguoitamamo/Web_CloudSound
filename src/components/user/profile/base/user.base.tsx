'use client'
import { Box } from "@mui/material";
import { useSession } from 'next-auth/react';



const Base = () => {

    const { data: session } = useSession();


    return (

        <Box sx={{
            display: 'flex', alignItems: 'center', gap: 2, padding: 3,
            background: 'rgba(58, 53, 53, 0.5)',
            borderRadius: 2,
            mt: 3


        }}>
            <Box
                sx={{
                    flex: 7,
                    "P": {
                        fontWeight: 'bold',
                        fontSize: 20,
                    }
                }}


            >
                <p>Huỳnh Ngọc Trương</p>
            </Box >
            <Box
                sx={{
                    flex: 3,
                    width: 150,
                    height: 300,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${session?.user?.avatar}`}
                    alt="cover"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
        </Box >
    )
}

export default Base;
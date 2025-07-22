'use client';
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const vipDescriptions: Record<string, string> = {
    'Vip 1': `Nghe được bài hát vip, tạo group user tối đa 5 user`,
    'Vip 2': `Nghe được bài hát vip, tạo group user tối đa 10 user`,
    'Vip 3': `Nghe được bài hát vip, tạo group user tối đa 20 user`,
};

const Vip = () => {
    const [selectedVip, setSelectedVip] = useState<'Vip 1' | 'Vip 2' | 'Vip 3'>('Vip 1');

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
                {(['Vip 1', 'Vip 2', 'Vip 3'] as const).map((vip) => (
                    <Button
                        key={vip}
                        onClick={() => setSelectedVip(vip)}
                        variant={selectedVip === vip ? 'contained' : 'outlined'}
                        sx={{
                            color: selectedVip === vip ? 'white' : 'black',
                            backgroundColor: selectedVip === vip ? 'black' : 'white',
                            borderColor: 'black',
                            borderRadius: '5px',
                            height: '50px',
                            width: '80px',
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        {vip}
                    </Button>
                ))}
            </Box>

            <Typography variant="body1"
                sx={{
                    padding: 5,
                    mt: 5,
                    height: '200px',
                    border: '2px dashed',
                    borderRadius: '10px'
                }}>
                {vipDescriptions[selectedVip]}
                <Button>Mua</Button>
            </Typography>
        </Box>
    );
};

export default Vip;

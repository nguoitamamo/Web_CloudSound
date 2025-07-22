'use client'
import { useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Divider,
    Stack,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const AuthSignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null);

    const handleCredentialSignIn = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await signIn('credentials', {
            username: email,
            password: password,
            redirect: false
        })

        if (!res?.error) {
            router.push('/');
        } else {
            setError(res?.error);
        }

    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >

            <Box
                component="form"
                onSubmit={handleCredentialSignIn}
                sx={{
                    backgroundColor: 'white',
                    border: '2px dashed black',
                    padding: 4,
                    borderRadius: 4,
                    width: 350,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    boxShadow: 'unset',
                }}
            >
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                <TextField
                    type="email"
                    placeholder="Nhập Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                />
                <TextField
                    type="password"
                    placeholder="Nhập Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ background: 'black', color: 'white' }}
                >
                    Đăng nhập
                </Button>

                <Divider>Hoặc</Divider>

                <Stack spacing={1.5}>
                    <Button
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        fullWidth
                        onClick={() => signIn('google')}
                        sx={{
                            border: '2px dashed black',
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                    >
                        Đăng nhập với Google
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<GitHubIcon />}
                        fullWidth
                        onClick={() => signIn('github')}
                        sx={{
                            border: '2px dashed black',
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                    >
                        Đăng nhập với GitHub
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default AuthSignIn

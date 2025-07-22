
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuth from './(user)/lib/next.auth.wrapper';
import { WaveSurferProvider } from '@/components/track/context.wavetrack';
import { Container } from '@mui/material';
import ProgressProviders from '@/components/lib/ProgressBarProvider';
import { ToastProvider } from '@/components/lib/toast';
import { SongProvider } from '@/components/track/context.viewtrack';



export default function RootLayout({ children }: { children: React.ReactNode }) {



    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <ProgressProviders>
                        <NextAuth>
                            <WaveSurferProvider>
                                <SongProvider>
                                    <ToastProvider>
                                        <Container>
                                            {children}
                                        </Container>
                                    </ToastProvider>
                                </SongProvider>
                            </WaveSurferProvider>
                        </NextAuth>
                    </ProgressProviders>
                </ThemeRegistry>
            </body>
        </html>
    );
}

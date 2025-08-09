
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuth from './(user)/lib/next.auth.wrapper';
import { WaveSurferProvider } from '@/components/track/context.wavetrack';
import { Container } from '@mui/material';
import ProgressProviders from '@/components/lib/ProgressBarProvider';
import { ToastProvider } from '@/components/lib/toast';
import { SongProvider } from '@/components/track/context.viewtrack';
import ReduxProvider from '@/components/redux/redux-provider';

import './globals.css'
import StreamVideoProvider from 'providers/StreamClientProvider';
import Header from '@/components/header/app.header';


export default function RootLayout({ children }: { children: React.ReactNode }) {



    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <ProgressProviders>
                        <NextAuth>

                            <WaveSurferProvider>
                                <ReduxProvider>

                                    <SongProvider>

                                        <ToastProvider>

                                            <Container>
                                                {children}
                                            </Container>

                                        </ToastProvider>
                                    </SongProvider>

                                </ReduxProvider>
                            </WaveSurferProvider>
                        </NextAuth>
                    </ProgressProviders>
                </ThemeRegistry>
            </body>
        </html>
    );
}

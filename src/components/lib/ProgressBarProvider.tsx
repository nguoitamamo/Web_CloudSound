'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <ProgressBar
                height="2px"
                color="#1d1d14ff"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
};

export default ProgressProviders;
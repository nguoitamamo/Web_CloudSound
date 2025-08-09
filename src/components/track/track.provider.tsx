"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useWaveSurfer } from "./context.wavetrack";




const FooterProvider = ({ children }: { children: ReactNode }) => {

    const searchParams = useSearchParams();
    const audio = searchParams.get('audio');


    const { wavesurferRef } = useWaveSurfer();



    
    return (
        <>
            {children}
        </>


    )

};

export default FooterProvider;

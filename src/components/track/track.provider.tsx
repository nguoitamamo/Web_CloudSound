"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";




const FooterProvider = ({ children }: { children: ReactNode }) => {

    const searchParams = useSearchParams();
    const audio = searchParams.get('audio');


    


    return (
        <>
            {children}
        </>


    )

};

export default FooterProvider;

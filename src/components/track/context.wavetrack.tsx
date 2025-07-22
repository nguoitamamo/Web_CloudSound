'use client'
import { createContext, useContext, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface IWaveSurferContext {
    wavesurferRef: React.MutableRefObject<WaveSurfer | null>;
}

const WaveSurferContext = createContext<IWaveSurferContext | null>(null);

export const WaveSurferProvider = ({ children }: { children: React.ReactNode }) => {
    const wavesurferRef = useRef<WaveSurfer | null>(null);

    return (
        <WaveSurferContext.Provider value={{ wavesurferRef }}>
            {children}
        </WaveSurferContext.Provider>
    );
};

export const useWaveSurfer = () => {
    const ctx = useContext(WaveSurferContext);
    if (!ctx) throw new Error("useWaveSurfer must be used within WaveSurferProvider");
    return ctx;
};

'use client'
import { createContext, useContext, useRef, useState } from "react";

interface SongContextType {
    currentSong: ISongContextCurrent | null;
    setCurrentSong: (song: ISongContextCurrent) => void;
}


const SongContext = createContext<SongContextType | null>(null);

export const SongProvider = ({ children }: { children: React.ReactNode }) => {

    const [currentSong, setCurrentSong] = useState<ISongContextCurrent | null>(null);

    return (
        <SongContext.Provider value={{ currentSong, setCurrentSong }}>
            {children}
        </SongContext.Provider>
    );
};

// Hook sử dụng context
export const useSongContext = (): SongContextType => {
    const context = useContext(SongContext);
    if (!context) {
        throw new Error("useSongContext must be used within a SongProvider");
    }
    return context;
};
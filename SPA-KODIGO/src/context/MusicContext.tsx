import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playlist: Song[];
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
  setPlaylist: (songs: Song[]) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicContext.Provider value={{
      currentSong,
      isPlaying,
      playlist,
      setCurrentSong,
      togglePlay,
      setPlaylist
    }}>
      {children}
    </MusicContext.Provider>
  );
};
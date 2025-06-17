import React from 'react';
import { Play, Pause } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';

interface SongCardProps {
  song: {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    image: string;
  };
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = useMusicContext();
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer">
      <div className="relative mb-4">
        <img 
          src={song.image} 
          alt={song.title}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0
                     transition-all duration-300 hover:bg-purple-700 hover:scale-105"
        >
          {isCurrentSong && isPlaying ? (
            <Pause size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white ml-1" />
          )}
        </button>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
          {song.title}
        </h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
        <p className="text-xs text-gray-500">{song.duration}</p>
      </div>
    </div>
  );
};

export default SongCard;
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';

const MusicPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlay } = useMusicContext();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          <img 
            src={currentSong.image} 
            alt={currentSong.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <h4 className="text-white font-medium truncate">{currentSong.title}</h4>
            <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Heart size={16} className="text-gray-400 hover:text-red-400" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <SkipForward size={20} />
          </button>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center space-x-2 flex-1 justify-end">
          <Volume2 size={20} className="text-gray-400" />
          <div className="w-24 h-1 bg-gray-600 rounded-full">
            <div className="w-1/2 h-full bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
import React, { useEffect } from 'react';
import SongCard from '../components/SongCard';
import { useMusicContext } from '../context/MusicContext';

const Inicio: React.FC = () => {
  const { setPlaylist } = useMusicContext();

  const featuredSongs = [
    {
      id: '1',
      title: 'Midnight Dreams',
      artist: 'Luna Nova',
      album: 'Cosmic Waves',
      duration: '3:45',
      image: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Electric Sunset',
      artist: 'Neon Lights',
      album: 'Synthwave Dreams',
      duration: '4:12',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Ocean Breeze',
      artist: 'Coastal Vibes',
      album: 'Summer Anthology',
      duration: '3:28',
      image: 'https://images.pexels.com/photos/1762578/pexels-photo-1762578.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'City Lights',
      artist: 'Urban Echo',
      album: 'Metropolitan',
      duration: '4:01',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      title: 'Starlight Melody',
      artist: 'Celestial Sound',
      album: 'Galaxy Sessions',
      duration: '3:52',
      image: 'https://images.pexels.com/photos/1749452/pexels-photo-1749452.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      title: 'Golden Hour',
      artist: 'Sunset Collective',
      album: 'Evening Moods',
      duration: '4:18',
      image: 'https://images.pexels.com/photos/1652340/pexels-photo-1652340.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const trendingSongs = [
    {
      id: '7',
      title: 'Digital Love',
      artist: 'Future Beats',
      album: 'Cyber Romance',
      duration: '3:33',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '8',
      title: 'Rhythm of the Night',
      artist: 'Dance Floor Kings',
      album: 'Club Anthems',
      duration: '4:25',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '9',
      title: 'Whispers in the Wind',
      artist: 'Acoustic Soul',
      album: 'Intimate Sessions',
      duration: '3:17',
      image: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '10',
      title: 'Thunder Storm',
      artist: 'Rock Legends',
      album: 'Power Surge',
      duration: '4:44',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  useEffect(() => {
    setPlaylist([...featuredSongs, ...trendingSongs]);
  }, [setPlaylist]);

  return (
    <div className="space-y-8 pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Bienvenido a Kodigo Music
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl">
          Descubre tu nueva música favorita. Explora millones de canciones, crea listas de reproducción y disfruta de la mejor calidad de audio.
          Vibra con la mejor música mientras codificas.
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200">
          Explorar Ahora
        </button>
      </div>

      {/* Featured Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-white">Música Destacada</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {featuredSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-white">Tendencias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
          <div className="text-2xl font-bold text-purple-400 mb-2">50M+</div>
          <div className="text-gray-300 text-sm">Canciones</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
          <div className="text-2xl font-bold text-blue-400 mb-2">10M+</div>
          <div className="text-gray-300 text-sm">Artistas</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
          <div className="text-2xl font-bold text-green-400 mb-2">1M+</div>
          <div className="text-gray-300 text-sm">Álbumes</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
          <div className="text-2xl font-bold text-pink-400 mb-2">100M+</div>
          <div className="text-gray-300 text-sm">Usuarios</div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
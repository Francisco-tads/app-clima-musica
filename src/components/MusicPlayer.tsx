import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { MusicTrack } from '../types/weather';

interface MusicPlayerProps {
  tracks: MusicTrack[];
  weatherMain: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, weatherMain }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = tracks[currentTrack] || tracks[0];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const getWeatherPlaylistName = (weather: string): string => {
    const names = {
      Clear: 'Dias Ensolarados',
      Rain: 'Chuva Relaxante',
      Clouds: 'Céu Nublado',
      Snow: 'Inverno Aconchegante',
      Thunderstorm: 'Tempestade Dramática'
    };
    return names[weather as keyof typeof names] || 'Ambiente Perfeito';
  };

  if (!currentSong) return null;

  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 text-white shadow-2xl border border-white/30">
      <div className="flex items-center space-x-2 mb-6">
        <Music className="w-5 h-5 text-white/90" />
        <h3 className="text-lg font-semibold">
          {getWeatherPlaylistName(weatherMain)}
        </h3>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-32 h-32 rounded-2xl mx-auto mb-4 object-cover shadow-lg"
          />
          <h4 className="font-semibold text-lg mb-1">{currentSong.title}</h4>
          <p className="text-white/80">{currentSong.artist}</p>
        </div>

        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={prevTrack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-white/30 hover:bg-white/40 transition-colors backdrop-blur-sm"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </button>
          
          <button
            onClick={nextTrack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <Volume2 className="w-4 h-4 text-white/80" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 accent-blue-400"
          />
        </div>

        <div className="space-y-2">
          <h5 className="text-sm font-medium text-white/90 mb-3">Próximas na fila:</h5>
          {tracks.slice(0, 3).map((track, index) => (
            <div
              key={track.id}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors backdrop-blur-sm ${
                index === currentTrack ? 'bg-white/30' : 'hover:bg-white/20'
              }`}
              onClick={() => setCurrentTrack(index)}
            >
              <img
                src={track.cover}
                alt={track.title}
                className="w-8 h-8 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{track.title}</div>
                <div className="text-xs text-white/80 truncate">{track.artist}</div>
              </div>
              <div className="text-xs text-white/80">{track.duration}</div>
            </div>
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.audio}
        onEnded={nextTrack}
        preload="metadata"
      />
    </div>
  );
};
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronUp } from 'lucide-react';

const playlist = [
  {
    title: 'Apocalypse',
    url: 'https://senacloud.my.id/u/8434e297fb90b3b3.mp3',
  },
  {
    title: 'Untitled',
    url: 'https://senacloud.my.id/u/f66900c40649417b.mp3',
  },
  {
    title: 'Confident',
    url: 'https://senacloud.my.id/u/9c11315718bf7cd7.mp3',
  },
];

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={playlist[currentTrack].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-30 glass p-3 rounded-lg text-accent hover:text-accent-light transition-colors"
        title="Music Player"
      >
        <Play size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-6 z-30 glass rounded-xl p-4 w-80 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-accent">Music Player</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-secondary hover:text-accent transition-colors"
              >
                <ChevronUp size={20} />
              </button>
            </div>

            {/* Now Playing */}
            <div className="mb-4 p-3 bg-tertiary rounded-lg">
              <p className="text-sm text-secondary mb-1">Now Playing</p>
              <p className="font-semibold text-primary">{playlist[currentTrack].title}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-tertiary rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-xs text-secondary mt-2">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={prevTrack}
                className="text-secondary hover:text-accent transition-colors"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={togglePlay}
                className="bg-accent text-white p-2 rounded-full hover:bg-accent-light transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                onClick={nextTrack}
                className="text-secondary hover:text-accent transition-colors"
              >
                <SkipForward size={20} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-secondary" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-tertiary rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Playlist */}
            <div className="mt-4 pt-4 border-t border-primary">
              <p className="text-xs text-secondary mb-2">Playlist</p>
              <div className="space-y-2">
                {playlist.map((track, index) => (
                  <button
                    key={track.title}
                    onClick={() => {
                      setCurrentTrack(index);
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left text-sm p-2 rounded transition-colors ${
                      currentTrack === index
                        ? 'bg-accent text-white'
                        : 'text-secondary hover:text-accent'
                    }`}
                  >
                    {track.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

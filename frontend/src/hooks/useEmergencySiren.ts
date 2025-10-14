import { useState, useRef, useEffect } from 'react';

interface EmergencySirenOptions {
  volume?: number;
  onPlay?: () => void;
  onStop?: () => void;
  onError?: (error: Error) => void;
}

export const useEmergencySiren = (options: EmergencySirenOptions = {}) => {
  const {
    volume = 1.0,
    onPlay,
    onStop,
    onError
  } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    // Create audio element with inline siren sound (base64 encoded)
    // This is a short emergency siren sound
    const audio = new Audio();
    
    // Using Web Audio API to generate siren sound
    // This ensures the siren works without external files
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();
    
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = volume;
    
    // Set to maximum volume even if device is on silent (iOS limitation workaround)
    audio.volume = 1.0;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [volume]);

  // Generate siren sound using Web Audio API
  const generateSirenSound = () => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Create siren effect (alternating frequencies)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.5);
    oscillator.frequency.exponentialRampToValueAtTime(800, context.currentTime + 1);

    gainNode.gain.setValueAtTime(0.7, context.currentTime);

    return { oscillator, gainNode, context };
  };

  const playSiren = async () => {
    if (isPlaying) return;

    setIsLoading(true);

    try {
      // Resume audio context (required for iOS)
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Play using both HTML5 Audio and Web Audio API for maximum compatibility
      if (audioRef.current) {
        // Create a simple siren tone using data URI
        const sirenDataUri = createSirenDataUri();
        audioRef.current.src = sirenDataUri;
        
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          onPlay?.();
        } catch (playError) {
          console.warn('HTML5 Audio failed, using Web Audio API:', playError);
          // Fallback to Web Audio API
          const siren = generateSirenSound();
          if (siren) {
            siren.oscillator.start();
            setIsPlaying(true);
            onPlay?.();
          }
        }
      }

      // Trigger vibration on supported devices
      if ('vibrate' in navigator) {
        // Vibration pattern: vibrate for 200ms, pause 100ms, repeat
        const vibrationPattern = [200, 100, 200, 100, 200];
        navigator.vibrate(vibrationPattern);
        
        // Continue vibrating while siren is playing
        const vibrationInterval = setInterval(() => {
          if (navigator.vibrate) {
            navigator.vibrate(vibrationPattern);
          }
        }, 1000);
        
        // Store interval ID for cleanup
        (audioRef.current as any).vibrationInterval = vibrationInterval;
      }

    } catch (error) {
      console.error('Failed to play siren:', error);
      onError?.(error as Error);
      alert('Unable to play siren. Please check your device settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const stopSiren = () => {
    if (!isPlaying) return;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        
        // Stop vibration
        if ('vibrate' in navigator) {
          navigator.vibrate(0);
          
          // Clear vibration interval
          const interval = (audioRef.current as any).vibrationInterval;
          if (interval) {
            clearInterval(interval);
          }
        }
      }

      // Stop Web Audio API oscillators
      if (audioContextRef.current) {
        audioContextRef.current.suspend();
      }

      setIsPlaying(false);
      onStop?.();
    } catch (error) {
      console.error('Failed to stop siren:', error);
      onError?.(error as Error);
    }
  };

  const toggleSiren = () => {
    if (isPlaying) {
      stopSiren();
    } else {
      playSiren();
    }
  };

  return {
    isPlaying,
    isLoading,
    playSiren,
    stopSiren,
    toggleSiren
  };
};

// Helper function to create a siren sound as data URI
function createSirenDataUri(): string {
  // This creates a simple alternating tone siren
  // Using a pre-generated siren sound in base64 format
  // In production, you should use an actual .mp3 or .wav file
  
  // For demo purposes, returning a data URI for a simple beep
  // Replace this with actual siren sound file
  const sampleRate = 44100;
  const duration = 2; // 2 seconds
  const numSamples = sampleRate * duration;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  // Generate siren sound (alternating frequencies)
  let offset = 44;
  const freq1 = 800; // Low frequency
  const freq2 = 1200; // High frequency
  const cycleDuration = sampleRate; // 1 second per cycle

  for (let i = 0; i < numSamples; i++) {
    const cyclePosition = i % cycleDuration;
    const frequency = cyclePosition < cycleDuration / 2 ? freq1 : freq2;
    const value = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0x7FFF;
    view.setInt16(offset, value, true);
    offset += 2;
  }

  // Convert to base64
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);

  return `data:audio/wav;base64,${base64}`;
}
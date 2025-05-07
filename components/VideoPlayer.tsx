import React, { useRef, useEffect, useState } from 'react';
import { CameraIcon, ExclamationCircleIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import { useCamera } from '../hooks/useCamera';
import { Loading } from './Loading';

interface VideoPlayerProps {
  onQualityChange?: (quality: 'high' | 'medium' | 'low') => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ onQualityChange }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const {
    cameraState,
    cameraConfig,
    togglePlay,
    setStreamQuality,
  } = useCamera();
  const [streamError, setStreamError] = useState<string | null>(null);

  useEffect(() => {
    if (!cameraState.isPlaying) return;
    
    setStreamError(null);
    
    const ws = new WebSocket('ws://localhost:8654/ws/video');
    ws.binaryType = 'arraybuffer';
    
    ws.onmessage = (event) => {
      if (imgRef.current) {
        const blob = new Blob([event.data], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        imgRef.current.src = imageUrl;
        imgRef.current.onload = () => URL.revokeObjectURL(imageUrl);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStreamError('Failed to receive video stream. Please check your connection.');
    };

    ws.onclose = () => {
      if (cameraState.isPlaying) {
        setStreamError('Video stream connection closed. Please reconnect.');
      }
    };

    return () => {
      ws.close();
    };
  }, [cameraState.isPlaying]);

  const handleQualityChange = (quality: 'high' | 'medium' | 'low') => {
    setStreamQuality(quality);
    onQualityChange?.(quality);
  };

  return (
    <div className="bg-black w-full h-[70%] relative rounded-t-lg flex items-center justify-center">

      {cameraState.isLoading ? (
        <Loading size="large" color="white" text="Connecting to camera..." />
      ) : !cameraState.isConnected ? (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center px-4">
            <CameraIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Enter camera details and connect</p>
          </div>
        </div>
      ) : streamError ? (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/80">
          <div className="text-center px-4">
            <ExclamationCircleIcon className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-lg text-red-300">{streamError}</p>
            <button 
              onClick={() => setStreamError(null)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : !cameraState.isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/80">
          <div className="text-center px-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading stream...</p>
          </div>
        </div>
      ) : (
        <>
          <img
            ref={imgRef}
            className="w-full h-full object-contain"
            alt="Video Stream"
          />
          <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-gradient-to-b from-black/70 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className={`text-white text-xs px-2 py-1 rounded mr-2 ${
                  cameraState.isPlaying ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                  {cameraState.isPlaying ? 'Live' : 'Paused'}
                </span>
                <span className="text-white text-sm truncate">{cameraConfig.ipAddress || "RTSP Stream"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={cameraState.streamQuality}
                  onChange={(e) => handleQualityChange(e.target.value as 'high' | 'medium' | 'low')}
                  className="bg-black/50 text-white text-xs px-2 py-1 rounded border border-gray-600"
                >
                  <option value="high">High Quality</option>
                  <option value="medium">Medium Quality</option>
                  <option value="low">Low Quality</option>
                </select>
                <button
                  onClick={togglePlay}
                  className="p-1 rounded hover:bg-white/10"
                >
                  {cameraState.isPlaying ? (
                    <PauseIcon className="w-4 h-4 text-white" />
                  ) : (
                    <PlayIcon className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}; 
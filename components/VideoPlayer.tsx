import React, { useRef, useEffect } from 'react';
import { CameraIcon, ExclamationCircleIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import { useCamera } from '../hooks/useCamera';

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

  useEffect(() => {
    console.log('cameraState.isPlaying', cameraState.isPlaying);
    if (!cameraState.isPlaying) return;
    console.log('cameraState.isPlaying', cameraState.isPlaying);
    
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

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    ws.onopen = () => {
      console.log('WebSocket opened');
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
      
      {!cameraState.isConnected ? (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center px-4">
            <CameraIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Enter camera details and connect</p>
          </div>
        </div>
      ) : cameraState.error ? (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/80">
          <div className="text-center px-4">
            <ExclamationCircleIcon className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-lg text-red-300">{cameraState.error}</p>
            <button 
              onClick={togglePlay}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
            >
              Try Again
            </button>
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
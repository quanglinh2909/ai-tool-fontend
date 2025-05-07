// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { VideoPlayer } from '../components/VideoPlayer';
import { CameraConfig } from '../components/CameraConfig';
import { RtspUrlManager } from '../components/RtspUrlManager';
import { useCamera, CameraConfig as CameraConfigType, CameraState } from '../hooks/useCamera';

export default function Home() {
  const {
    cameraConfig,
    cameraState,
    connectToCamera,
    disconnectCamera,
    togglePlay,
    updateCameraConfig,
    generateRtspUrl,
  } = useCamera();

  const [savedCameras, setSavedCameras] = useState<CameraConfigType[]>([]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Load saved cameras from localStorage on component mount
  useEffect(() => {
    const savedCamerasData = localStorage.getItem('savedCameras');
    if (savedCamerasData) {
      try {
        setSavedCameras(JSON.parse(savedCamerasData));
      } catch (err) {
        console.error('Failed to parse saved cameras:', err);
      }
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCameraConfig({ [name]: value });
  };

  // Save camera configuration
  const saveCamera = () => {
    if (!cameraConfig.ipAddress || !cameraConfig.username || !cameraConfig.password) {
      return;
    }
    
    try {
      const existingIndex = savedCameras.findIndex(
        camera => camera.ipAddress === cameraConfig.ipAddress
      );
      
      let updatedCameras;
      if (existingIndex >= 0) {
        updatedCameras = [...savedCameras];
        updatedCameras[existingIndex] = cameraConfig;
      } else {
        updatedCameras = [...savedCameras, cameraConfig];
      }
      
      setSavedCameras(updatedCameras);
      localStorage.setItem('savedCameras', JSON.stringify(updatedCameras));
    } catch (err) {
      console.error('Failed to save camera:', err);
    }
  };

  // Load a saved camera
  const loadSavedCamera = (camera: CameraConfigType) => {
    updateCameraConfig(camera);
  };

  // Copy RTSP URL to clipboard
  const copyToClipboard = () => {
    const url = generateRtspUrl(cameraConfig);
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>RTSP Camera Viewer</title>
        <meta name="description" content="View RTSP camera streams" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Back Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="ml-4 text-lg font-semibold text-gray-900">RTSP Camera Viewer</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column: Video player and RTSP URL manager */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div style={{height: '85vh'}} >
                <VideoPlayer />
                <RtspUrlManager
                  rtspUrl={generateRtspUrl(cameraConfig)}
                  isConnected={cameraState.isConnected}
                  isCopied={isCopied}
                  onCopyToClipboard={copyToClipboard}
                  onDisconnect={disconnectCamera}
                />
              </div>
            </div>
            
           
          </div>

          {/* Right column: Camera configuration */}
          <div>
            <CameraConfig
              config={cameraConfig}
              error={cameraState.error}
              onConfigChange={handleInputChange}
              onSubmit={async () => {
                await togglePlay();
              }}
              onSave={saveCamera}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
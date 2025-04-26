import { useState, useEffect, useCallback } from 'react';

export interface CameraConfig {
  name: string;
  ipAddress: string;
  port: string;
  username: string;
  password: string;
  channel: string;
}

export interface CameraState {
  isConnected: boolean;
  isPlaying: boolean;
  error: string | null;
  streamQuality: 'high' | 'medium' | 'low';
}

export const useCamera = () => {
  const [cameraConfig, setCameraConfig] = useState<CameraConfig>({
    name: '',
    ipAddress: '',
    port: '554',
    username: '',
    password: '',
    channel: '0',
  });

  const [cameraState, setCameraState] = useState<CameraState>({
    isConnected: false,
    isPlaying: false,
    error: null,
    streamQuality: 'high',
  });

  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const generateRtspUrl = useCallback((config: CameraConfig): string => {
    const { ipAddress, port, username, password, channel } = config;
    const authPart = username && password ? `${username}:${password}@` : '';
    return `rtsp://${authPart}${ipAddress}:${port}/streaming/channels/${channel}`;
  }, []);

  const connectToCamera = useCallback(async () => {
    try {
      setCameraState(prev => ({ ...prev, error: null }));
      
      // Close existing connection if any
      if (wsConnection) {
        wsConnection.close();
      }

      const ws = new WebSocket('ws://localhost:8654/ws/video');
      ws.binaryType = 'arraybuffer';

      ws.onopen = () => {
        console.log('WebSocket opened');
        setCameraState(prev => ({ ...prev, isConnected: true ,isPlaying: true}));
        setRetryCount(0);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setCameraState(prev => ({
          ...prev,
          error: 'Failed to connect to camera. Please check your settings.',
          isConnected: false,
        }));
      };

      ws.onclose = () => {
        if (cameraState.isPlaying) {
          if (retryCount < MAX_RETRIES) {
            setRetryCount(prev => prev + 1);
            setTimeout(() => connectToCamera(), 1000 * Math.pow(2, retryCount));
          } else {
            setCameraState(prev => ({
              ...prev,
              error: 'Connection lost. Please try reconnecting.',
              isConnected: false,
              isPlaying: false,
            }));
          }
        }
      };

      setWsConnection(ws);
    } catch (error) {
      setCameraState(prev => ({
        ...prev,
        error: 'Failed to initialize camera connection.',
        isConnected: false,
      }));
    }
  }, [wsConnection, cameraState.isPlaying, retryCount]);

  const disconnectCamera = useCallback(() => {
    if (wsConnection) {
      wsConnection.close();
    }
    setCameraState(prev => ({
      ...prev,
      isConnected: false,
      isPlaying: false,
      error: null,
    }));
    setWsConnection(null);
  }, [wsConnection]);

  const togglePlay = useCallback(() => {
    setCameraState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, []);

  const setStreamQuality = useCallback((quality: 'high' | 'medium' | 'low') => {
    setCameraState(prev => ({
      ...prev,
      streamQuality: quality,
    }));
  }, []);

  const updateCameraConfig = useCallback((config: Partial<CameraConfig>) => {
    setCameraConfig(prev => ({
      ...prev,
      ...config,
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsConnection) {
        wsConnection.close();
      }
    };
  }, [wsConnection]);

  return {
    cameraConfig,
    cameraState,
    connectToCamera,
    disconnectCamera,
    togglePlay,
    setStreamQuality,
    updateCameraConfig,
    generateRtspUrl,
  };
}; 
// pages/index.tsx
import ControlPanel from '@/components/ControlPanel';
import PolygonDrawer from '@/components/PolygonDrawer';
import { useRef, useEffect, useState } from 'react';

export default function Home3() {
  const imgRef = useRef<any>(null);
  const [points, setPoints] = useState<{x: number; y: number}[]>([]);
  const [coordinates, setCoordinates] = useState<string>('');
  const [arrowAngle, setArrowAngle] = useState<number>(0);


  useEffect(() => {
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

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const clearAllPoints = () => {
    setPoints([]);
    setCoordinates('');
  };

  const getCoordinates = () => {
    const coords = points.map(p => `(${p.x}, ${p.y})`).join(', ');
    setCoordinates(coords);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Video Stream with Polygon Drawing</h1>
      
      <div className="relative mb-6">
        <img
          ref={imgRef}
          className="rounded-lg shadow-lg"
          alt="Video Stream"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <PolygonDrawer 
          containerRef={imgRef}
          points={points} 
          setPoints={setPoints}
          arrowAngle={arrowAngle}
        />
      </div>

      <ControlPanel 
        onClear={clearAllPoints} 
        onGetCoordinates={getCoordinates}
        arrowAngle={arrowAngle}
        setArrowAngle={setArrowAngle}
      />

      {coordinates && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-2">Polygon Coordinates:</h2>
          <p className="break-words">{coordinates}</p>
        </div>
      )}
    </div>
  );
}
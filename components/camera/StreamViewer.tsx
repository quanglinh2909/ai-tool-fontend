import React from 'react';

export const StreamViewer: React.FC<{ isConnected: boolean; isLoading: boolean; imgRef: any; ipAddress: string }> = ({ isConnected, isLoading, imgRef, ipAddress }) => {
  return (
    <div className="relative bg-black">
      {isLoading ? (
        <div className="center">Loading...</div>
      ) : !isConnected ? (
        <div className="center">Please connect a camera</div>
      ) : (
        <>
          <img ref={imgRef} alt="Stream" />
          <div className="overlay">{ipAddress || 'RTSP Stream'}</div>
        </>
      )}
    </div>
  );
};
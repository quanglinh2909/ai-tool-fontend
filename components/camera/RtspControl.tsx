import React from 'react';
import { ClipboardIcon, ArrowPathIcon, StopIcon } from '@heroicons/react/24/outline';

interface RtspControlProps {
  rtspUrl: string;
  manualRtspUrl: string;
  isRtspLoading: boolean;
  isCopied: boolean;
  isConnected: boolean;
  handleManualRtspChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  connectWithManualRtsp: () => void;
  disconnectCamera: () => void;
  copyToClipboard: () => void;
}

export const RtspControl: React.FC<RtspControlProps> = ({
  rtspUrl,
  manualRtspUrl,
  isRtspLoading,
  isCopied,
  isConnected,
  handleManualRtspChange,
  connectWithManualRtsp,
  disconnectCamera,
  copyToClipboard
}) => {
  return (
    <div>
      <input value={manualRtspUrl} onChange={handleManualRtspChange} placeholder="RTSP URL" />
      <button onClick={connectWithManualRtsp} disabled={isRtspLoading}>
        <ArrowPathIcon /> Load
      </button>
      {isConnected && (
        <>
          <button onClick={copyToClipboard}><ClipboardIcon /></button>
          {isCopied && <span>Copied!</span>}
          <button onClick={disconnectCamera}><StopIcon /> Disconnect</button>

        </>
        
      )}
    </div>
  );
};
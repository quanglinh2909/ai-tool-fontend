import React from 'react';
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export interface RtspUrlManagerProps {
  rtspUrl: string;
  isConnected: boolean;
  isCopied: boolean;
  onCopyToClipboard: () => void;
  onDisconnect: () => void;
}

export const RtspUrlManager: React.FC<RtspUrlManagerProps> = ({
  rtspUrl,
  isConnected,
  isCopied,
  onCopyToClipboard,
  onDisconnect,
}) => {
  return (
    <div className="h-[80px] p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center justify-between h-full">
        <div className="flex-1 mr-4 mt-10">
          <div className="text-sm font-medium text-gray-700 mb-1">RTSP URL</div>
          <div className="flex items-center">
            <input
              type="text"
              value={rtspUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm"
            />
            <button
              onClick={onCopyToClipboard}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700"
              title="Copy to clipboard"
            >
              {isCopied ? (
                <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500" />
              ) : (
                <ClipboardDocumentIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {isConnected && (
          <button
            onClick={onDisconnect}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm mt-15"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}; 
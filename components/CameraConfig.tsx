import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Loading } from './Loading';

interface CameraConfigProps {
  config: {
    name: string;
    ipAddress: string;
    port: string;
    username: string;
    password: string;
    channel: string;
  };
  isLoading: boolean;
  isRtspLoading: boolean;
  error: string | null;
  onConfigChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSave: () => void;
}

export const CameraConfig: React.FC<CameraConfigProps> = ({
  config,
  isLoading,
  isRtspLoading,
  error,
  onConfigChange,
  onSubmit,
  onSave
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Camera Configuration</h2>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 border-b border-red-200">
          <div className="flex items-start">
            <ExclamationCircleIcon className="w-5 h-5 text-red-400 mt-0.5 mr-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="p-4 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Camera Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={config.name}
            onChange={onConfigChange}
            placeholder="My Camera"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700">
            IP Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ipAddress"
            name="ipAddress"
            value={config.ipAddress}
            onChange={onConfigChange}
            required
            placeholder="192.168.1.100"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="port" className="block text-sm font-medium text-gray-700">
            Port
          </label>
          <input
            type="text"
            id="port"
            name="port"
            value={config.port}
            onChange={onConfigChange}
            placeholder="554"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={config.username}
            onChange={onConfigChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={config.password}
            onChange={onConfigChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="channel" className="block text-sm font-medium text-gray-700">
            Channel
          </label>
          <input
            type="text"
            id="channel"
            name="channel"
            value={config.channel}
            onChange={onConfigChange}
            placeholder="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading || isRtspLoading}
            className={`flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading || isRtspLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? (
              <Loading size="small" color="white" />
            ) : (
              'Connect'
            )}
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isLoading || isRtspLoading}
            className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 ${
              isLoading || isRtspLoading
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}; 
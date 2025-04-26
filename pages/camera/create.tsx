import * as React from 'react';
import { useEffect, useState } from 'react';

export interface ICreateCameraPageProps {
}
interface CameraConfig {
    ipAddress: string;
    port: string;
    username: string;
    password: string;
    channel: string;
  }
  

export default function CreateCameraPage(props: ICreateCameraPageProps) {
    const [cameraConfig, setCameraConfig] = useState<CameraConfig>({
        ipAddress: '',
        port: '554',
        username: '',
        password: '',
        channel: '0',
      });
    const imgRef = React.useRef<any>(null);
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

    return (
        <div className="flex flex-col sm:flex-row gap-4">
          {/*--------------- Video ---------------------*/}
          <div className="flex-1">
            <img
              ref={imgRef}
              className="rounded-lg shadow-lg"
              alt="Video Stream"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
    
          {/*--------------- Form ---------------------*/}
          <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Camera Connection Settings</h2>
              <form>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      IP Address *
                    </label>
                    <input
                      type="text"
                      id="ipAddress"
                      name="ipAddress"
                      value={cameraConfig.ipAddress}
                      placeholder="192.168.1.100"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
    
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-1">
                        Port
                      </label>
                      <input
                        type="text"
                        id="port"
                        name="port"
                        value={cameraConfig.port}
                        placeholder="554"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
    
                    <div>
                      <label htmlFor="channel" className="block text-sm font-medium text-gray-700 mb-1">
                        Channel
                      </label>
                      <input
                        type="text"
                        id="channel"
                        name="channel"
                        value={cameraConfig.channel}
                        placeholder="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
    
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={cameraConfig.username}
                      placeholder="admin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
    
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={cameraConfig.password}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
    
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
}


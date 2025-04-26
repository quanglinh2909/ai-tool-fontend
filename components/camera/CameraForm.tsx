import React from 'react';

interface CameraFormProps {
  cameraConfig: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  connectToCamera: (e: React.FormEvent) => void;
}

export const CameraForm: React.FC<CameraFormProps> = ({ cameraConfig, handleInputChange, isLoading, connectToCamera }) => {
  return (
    <form onSubmit={connectToCamera} className="space-y-3">
      <div>
        <label htmlFor="ipAddress">IP Address *</label>
        <input id="ipAddress" name="ipAddress" value={cameraConfig.ipAddress} onChange={handleInputChange} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input id="port" name="port" value={cameraConfig.port} onChange={handleInputChange} />
        <input id="channel" name="channel" value={cameraConfig.channel} onChange={handleInputChange} />
      </div>
      <input id="username" name="username" value={cameraConfig.username} onChange={handleInputChange} />
      <input id="password" name="password" type="password" value={cameraConfig.password} onChange={handleInputChange} />
      <button type="submit" disabled={isLoading}>Connect</button>
    </form>
  );
};
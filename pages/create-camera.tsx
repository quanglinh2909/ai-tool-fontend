import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Container,
    useTheme,
} from '@mui/material';
import LeftSildeCamera from '@/components/create-camera/left-side-camera';
import RightSideCamera from '@/components/create-camera/right-side-camera';
import { getRtspEncode, } from '@/ultis/camera';
import { CreateCameraModel } from '@/model/camera';
import { cameraApi } from '@/api/camera-api';

export default function CreateCamera() {
    const theme = useTheme();
    const imgRef = useRef<any>(null);
    const [stateCamera, setStateCamera] = useState<"loading" | "error" | "connected" | "init">("init");
    const [camera, setCamera] = useState<CreateCameraModel | {}>({});

    const wsRef = useRef<WebSocket | null>(null);

    const connect = (rtsp: string, username: string, password: string) => {
        // Đóng kết nối cũ nếu có
        if (wsRef.current) {
            console.log("Closing existing WebSocket connection...");
            wsRef.current.close();
            wsRef.current = null;
        }

        const rtspLocal = getRtspEncode(rtsp, username, password);
        const ws = new WebSocket(`ws://192.168.103.52:8007/ws/stream?rtsp=${encodeURIComponent(rtspLocal)}`);
        wsRef.current = ws;

        setStateCamera("loading");
        ws.binaryType = 'arraybuffer';

        ws.onmessage = (event) => {
            if (typeof event.data === 'string') {
                setStateCamera("error");
                return;
            }
            if (imgRef.current) {
                const blob = new Blob([event.data], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(blob);
                imgRef.current.src = imageUrl;
                imgRef.current.onload = () => URL.revokeObjectURL(imageUrl);
            }
        };

        ws.onopen = () => {
            console.log('WebSocket connection established');
            setStateCamera("connected");
        };

        ws.onerror = () => {
            setStateCamera("error");
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
    };

    // Đừng quên dọn dẹp trong useEffect nếu bạn thiết lập từ component:
    useEffect(() => {
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const handelCreateCamera = async () => {
        try {
            await cameraApi.createCamera(camera as CreateCameraModel)

        } catch (error) {
            console.log("Error creating camera:", error);

        }

    }



    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">

            <Box sx={{
                minHeight: '100%',
                width: '100%',
                py: 3,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                backdropFilter: 'blur(10px)',
            }}>
                <Container maxWidth={false} sx={{ height: '100%' }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                        gap: 3,
                        height: '100%',
                        maxWidth: '1600px',
                        margin: '0 auto'
                    }}>
                        {/* Left side - Preview and Controls */}
                        <LeftSildeCamera theme={theme} imgRef={imgRef} stateCamera={stateCamera} setCamera={setCamera} />


                        {/* Right side - Configuration Form */}
                        <RightSideCamera theme={theme}
                            setCamera={setCamera}
                            handelCreateCamera={handelCreateCamera}
                            connect={connect} />

                    </Box>
                </Container>
            </Box>
        </div>
    );
}

import React, { useState, ChangeEvent, useEffect } from 'react';
import {
    Box,
    Typography,
    alpha,
    IconButton,
    InputAdornment,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyledButton, StyledPaper, StyledTextField } from '@/components/create-camera/styles';
import { cameraApi } from '@/api/camera-api';
import { enqueueSnackbar } from 'notistack';
export interface IRightSideCameraProps {
    theme: any;
    connect: (rtsp: string, username: string, password: string) => void;
    setCamera: (camera: any) => void;
    handelCreateCamera: () => void;
}

export default function RightSideCamera(props: IRightSideCameraProps) {
    const { theme, connect, setCamera, handelCreateCamera } = props;
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [nameCamera, setNameCamera] = useState("demo");
    const [ipCamera, setIpCamera] = useState("192.168.104.2");
    const [httpPort, setHttpPort] = useState(80);
    const [rtsp, setRtsp] = useState<string>("");
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("Oryza123");


    const handelConnect = async () => {
        let rtsp_local: string = rtsp;
        if (!rtsp) {
            const { data } = await cameraApi.getRtsp({
                ip: ipCamera,
                htt_port: httpPort,
                username: username,
                password: password,
            });
            console.log(data);
            if (data?.status_code === 200) {
                setRtsp(data?.rtsp);
                rtsp_local = data?.rtsp;
            }
            else {
                enqueueSnackbar("Không thể kết nối đến camera", {
                    variant: "error",
                });
            }
        }
        connect(rtsp_local, username, password);
    }

    useEffect(() => {
        setCamera((prevCamera: any) => ({
            ...prevCamera,
            name: nameCamera,
            ip: ipCamera,
            htt_port: httpPort,
            username: username,
            password: password,
            rtsp: rtsp,
        }));
    }, [nameCamera, ipCamera, httpPort, rtsp, username, password])



    return (
        <StyledPaper sx={{ height: '98%' }}>
            <Typography variant="h6" gutterBottom sx={{
                fontWeight: 600,
                mb: 3,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                Cấu hình camera
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                        Tên camera
                    </Typography>
                    <StyledTextField
                        placeholder="Nhập tên camera"
                        variant="outlined"
                        fullWidth
                        value={nameCamera}
                        onChange={(e) => setNameCamera(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                        IP Camera
                    </Typography>
                    <StyledTextField
                        placeholder="Nhập IP camera"
                        variant="outlined"
                        fullWidth
                        value={ipCamera}
                        onChange={(e) => setIpCamera(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                        HTTP Port
                    </Typography>
                    <StyledTextField
                        placeholder="Nhập HTTP port"
                        variant="outlined"
                        fullWidth
                        type="number"
                        InputProps={{
                            inputProps: { min: 1, max: 65535 }
                        }}
                        value={httpPort}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value >= 1 && value <= 65535) {
                                setHttpPort(value);
                            }
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                        Tài khoản
                    </Typography>
                    <StyledTextField
                        placeholder="Nhập tài khoản"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                        Mật khẩu
                    </Typography>
                    <StyledTextField
                        placeholder="Nhập mật khẩu"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handlePasswordVisibility}
                                        edge="end"
                                        sx={{
                                            color: 'primary.main',
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                            },
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                        RTSP
                    </Typography>
                    <StyledTextField
                        placeholder="Nhập RTSP"
                        variant="outlined"
                        fullWidth
                        value={rtsp}
                        onChange={(e) => setRtsp(e.target.value)}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<ConnectWithoutContactIcon />}
                        onClick={handelConnect}
                    >
                        Connect
                    </StyledButton>
                    <StyledButton
                        variant="contained"
                        color="success"
                        fullWidth
                        startIcon={<SaveIcon />}
                        onClick={handelCreateCamera}
                    >
                        Save
                    </StyledButton>
                </Box>
            </Box>
        </StyledPaper>
    );
}

import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Tabs,
    Tab,
    Typography,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Slider,
    Switch,
    FormControlLabel as MuiFormControlLabel,
    useTheme,
    alpha,
    Theme,
    IconButton,
    InputAdornment,
    Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VideocamIcon from '@mui/icons-material/Videocam';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Sidebar from '@/components/Sidebar';
import SettingsIcon from '@mui/icons-material/Settings';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PolygonDrawer, { Arrow } from '@/components/PolygonDrawer';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const StyledPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        transform: 'translateY(-2px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
    },
}));

const PreviewImage = styled('img')(({ theme }: { theme: Theme }) => ({
    width: '640px',
    height: '480px',
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius * 2,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    margin: '0 auto',
    display: 'block',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        transform: 'scale(1.01)',
    },
}));

const StyledTab = styled(Tab)(({ theme }: { theme: Theme }) => ({
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    minHeight: 48,
    padding: '12px 24px',
    borderRadius: theme.shape.borderRadius,
    margin: '0 8px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.Mui-selected': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transform: 'translateY(-1px)',
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        transform: 'translateY(-1px)',
    },
}));

const StyledTabs = styled(Tabs)(({ theme }: { theme: Theme }) => ({
    minHeight: 'auto',
    '& .MuiTabs-indicator': {
        display: 'none',
    },
    '& .MuiTabs-flexContainer': {
        gap: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: alpha(theme.palette.primary.main, 0.06),
        borderRadius: theme.shape.borderRadius * 2,
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
    },
}));

const ControlBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    },
}));

const StyledButton = styled(Button)(({ theme }: { theme: Theme }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: 'none',
    fontWeight: 600,
    padding: theme.spacing(1.5, 3),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    },
    '&.MuiButton-contained': {
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.8)})`,
        '&:hover': {
            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        },
    },
}));

const StyledTextField = styled(TextField)(({ theme }: { theme: Theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius * 2,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
        '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: alpha(theme.palette.primary.main, 0.2),
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: alpha(theme.palette.primary.main, 0.3),
    },
}));

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`camera-tabpanel-${index}`}
            aria-labelledby={`camera-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function CreateCamera() {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
    const [aiEnabledVehicle, setAiEnabledVehicle] = useState(false);
    const [aiEnabledFace, setAiEnabledFace] = useState(false);
    const [rotationVehicle, setRotationVehicle] = useState(0);
    const [rotationFace, setRotationFace] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [enableDirectionFace, setEnableDirectionFace] = useState(false);
    const [enableDirectionVehicle, setEnableDirectionVehicle] = useState(false);
    const [angleInput, setAngleInput] = useState('0');
    const [directionOffsetFace, setDirectionOffsetFace] = useState('0');
    const [directionOffsetVehicle, setDirectionOffsetVehicle] = useState('0');

    const [pointsVehicle, setPointsVehicle] = useState<{ x: number; y: number }[]>([]);
    const [arrowVehicle, setArrowVehicle] = useState<Arrow | null>(null);
    const [pointsFace, setPointsFace] = useState<{ x: number; y: number }[]>([]);
    const [arrowFace, setArrowFace] = useState<Arrow | null>(null);

    const imgRef = useRef<any>(null);

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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleAiToggle = (event: ChangeEvent<HTMLInputElement>) => {
        if (tabValue === 0) {
            setAiEnabledVehicle(event.target.checked);
        } else {
            setAiEnabledFace(event.target.checked);
        }
    };

    const handleVehicleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setVehicleTypes(prev => {
            if (prev.includes(value)) {
                return prev.filter(type => type !== value);
            }
            return [...prev, value];
        });
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDirectionToggle = (event: ChangeEvent<HTMLInputElement>) => {
        if (tabValue === 0) {
            setEnableDirectionVehicle(event.target.checked);
            if (!event.target.checked) {
                setRotationVehicle(0);
                setAngleInput('0');
            }
        } else {
            setEnableDirectionFace(event.target.checked);
            if (!event.target.checked) {
                setRotationFace(0);
                setAngleInput('0');
            }
        }
    };

    const handleAngleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) && Number(value) <= 360) {
            setAngleInput(value);
            if (tabValue === 0) {
                setRotationVehicle(Number(value) || 0);
            } else {
                setRotationFace(Number(value) || 0);
            }
        }
    };

    const handleDirectionOffsetChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^-?\d*$/.test(value) && Number(value) >= -180 && Number(value) <= 180) {
            if (tabValue === 0) {
                setDirectionOffsetVehicle(value);
            } else {
                setDirectionOffsetFace(value);
            }
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Sidebar />
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
                        <StyledPaper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2,
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: alpha(theme.palette.primary.main, 0.04),
                            }}>
                                <VideocamIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h5" component="h1" sx={{
                                    fontWeight: 600,
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>
                                    Camera Preview
                                </Typography>
                            </Box>

                            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{
                                    position: 'relative',
                                    width: '640px',
                                    height: '480px',
                                }}>
                                    <PreviewImage ref={imgRef} src="/placeholder-camera.jpg" alt="Camera Preview" />
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}>
                                        <PolygonDrawer
                                            containerRef={imgRef}
                                            points={tabValue === 0 ? pointsVehicle : pointsFace}
                                            setPoints={tabValue === 0 ? setPointsVehicle : setPointsFace}
                                            arrowAngle={tabValue === 0 ? rotationVehicle : rotationFace}
                                            arrow={tabValue === 0 ? arrowVehicle : arrowFace}
                                            setArrow={tabValue === 0 ? setArrowVehicle : setArrowFace}
                                            showArrow={tabValue === 0 ? enableDirectionVehicle : enableDirectionFace}
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                mt: 3,
                                backgroundColor: 'background.paper',
                                borderRadius: 2,
                                boxShadow: 1,
                            }}>
                                <StyledTabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    variant="fullWidth"
                                >
                                    <StyledTab
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <VideocamIcon sx={{ fontSize: 20 }} />
                                                <span>Nhận dạng khuôn mặt</span>
                                            </Box>
                                        }
                                    />
                                    <StyledTab
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <DirectionsCarIcon sx={{ fontSize: 20 }} />
                                                <span>Nhận dạng biển số</span>
                                            </Box>
                                        }
                                    />
                                </StyledTabs>
                            </Box>

                            <TabPanel value={tabValue} index={0}>
                                <ControlBox>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            mb: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        Cài đặt nhận dạng khuôn mặt
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <MuiFormControlLabel
                                            control={
                                                <Switch
                                                    checked={aiEnabledVehicle}
                                                    onChange={handleAiToggle}
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                <Typography sx={{ fontWeight: 500 }}>
                                                    Bật/Tắt AI
                                                </Typography>
                                            }
                                        />
                                        <MuiFormControlLabel
                                            control={
                                                <Switch
                                                    checked={tabValue === 0 ? enableDirectionVehicle : enableDirectionFace}
                                                    onChange={handleDirectionToggle}
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                <Typography sx={{ fontWeight: 500 }}>
                                                    Bật/Tắt hướng đi
                                                </Typography>
                                            }
                                        />
                                        {(tabValue === 0 ? enableDirectionVehicle : enableDirectionFace) && (
                                            <Box sx={{ width: '100%' }}>
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography sx={{ fontWeight: 500, mb: 1 }}>
                                                        Hướng đi
                                                    </Typography>
                                                    <Slider
                                                        value={tabValue === 0 ? rotationVehicle : rotationFace}
                                                        onChange={(event, newValue) => {
                                                            if (tabValue === 0) {
                                                                setRotationVehicle(newValue as number);
                                                            } else {
                                                                setRotationFace(newValue as number);
                                                            }
                                                            setAngleInput(String(newValue));
                                                        }}
                                                        min={0}
                                                        max={360}
                                                        valueLabelDisplay="auto"
                                                        sx={{
                                                            color: 'primary.main',
                                                            '& .MuiSlider-thumb': {
                                                                '&:hover, &.Mui-focusVisible': {
                                                                    boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                    <Typography sx={{ fontWeight: 500, flex: 1 }}>
                                                        Góc
                                                    </Typography>
                                                    <StyledTextField
                                                        value={angleInput}
                                                        onChange={handleAngleInputChange}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            width: '100px',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">°</InputAdornment>,
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                    <Typography sx={{ fontWeight: 500, flex: 1 }}>
                                                        Độ lệch
                                                    </Typography>
                                                    <StyledTextField
                                                        value={directionOffsetVehicle}
                                                        onChange={handleDirectionOffsetChange}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            width: '100px',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">°</InputAdornment>,
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        <StyledButton
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<ClearIcon />}
                                            onClick={() => {
                                                setPointsVehicle([]);
                                                setArrowVehicle(null);
                                                setAngleInput('0');
                                                setDirectionOffsetVehicle('0');
                                            }}
                                        >
                                            Clear
                                        </StyledButton>
                                    </Box>
                                </ControlBox>
                            </TabPanel>

                            <TabPanel value={tabValue} index={1}>
                                <ControlBox>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            mb: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        Cài đặt nhận dạng biển số
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend" sx={{ fontWeight: 500, mb: 1 }}>
                                                Loại xe
                                            </FormLabel>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 2,
                                                justifyContent: 'space-between',
                                                '& .MuiFormControlLabel-root': {
                                                    margin: 0,
                                                    flex: 1,
                                                },
                                            }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={vehicleTypes.includes('motorcycle')}
                                                            onChange={handleVehicleTypeChange}
                                                            value="motorcycle"
                                                            color="primary"
                                                            sx={{
                                                                '& .MuiSvgIcon-root': {
                                                                    borderRadius: '50%',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label="Xe máy"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={vehicleTypes.includes('bicycle')}
                                                            onChange={handleVehicleTypeChange}
                                                            value="bicycle"
                                                            color="primary"
                                                            sx={{
                                                                '& .MuiSvgIcon-root': {
                                                                    borderRadius: '50%',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label="Xe đạp"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={vehicleTypes.includes('car')}
                                                            onChange={handleVehicleTypeChange}
                                                            value="car"
                                                            color="primary"
                                                            sx={{
                                                                '& .MuiSvgIcon-root': {
                                                                    borderRadius: '50%',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label="Xe ô tô"
                                                />
                                            </Box>
                                        </FormControl>
                                        <MuiFormControlLabel
                                            control={
                                                <Switch
                                                    checked={aiEnabledFace}
                                                    onChange={handleAiToggle}
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                <Typography sx={{ fontWeight: 500 }}>
                                                    Bật/Tắt AI
                                                </Typography>
                                            }
                                        />
                                        <MuiFormControlLabel
                                            control={
                                                <Switch
                                                    checked={tabValue === 0 ? enableDirectionVehicle : enableDirectionFace}
                                                    onChange={handleDirectionToggle}
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                <Typography sx={{ fontWeight: 500 }}>
                                                    Bật/Tắt hướng đi
                                                </Typography>
                                            }
                                        />
                                        {(tabValue === 0 ? enableDirectionVehicle : enableDirectionFace) && (
                                            <Box sx={{ width: '100%' }}>
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography sx={{ fontWeight: 500, mb: 1 }}>
                                                        Hướng đi
                                                    </Typography>
                                                    <Slider
                                                        value={tabValue === 0 ? rotationVehicle : rotationFace}
                                                        onChange={(event, newValue) => {
                                                            if (tabValue === 0) {
                                                                setRotationVehicle(newValue as number);
                                                            } else {
                                                                setRotationFace(newValue as number);
                                                            }
                                                            setAngleInput(String(newValue));
                                                        }}
                                                        min={0}
                                                        max={360}
                                                        valueLabelDisplay="auto"
                                                        sx={{
                                                            color: 'primary.main',
                                                            '& .MuiSlider-thumb': {
                                                                '&:hover, &.Mui-focusVisible': {
                                                                    boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                    <Typography sx={{ fontWeight: 500, flex: 1 }}>
                                                        Góc
                                                    </Typography>
                                                    <StyledTextField
                                                        value={angleInput}
                                                        onChange={handleAngleInputChange}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            width: '100px',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">°</InputAdornment>,
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                    <Typography sx={{ fontWeight: 500, flex: 1 }}>
                                                        Độ lệch
                                                    </Typography>
                                                    <StyledTextField
                                                        value={directionOffsetFace}
                                                        onChange={handleDirectionOffsetChange}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            width: '100px',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">°</InputAdornment>,
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        <StyledButton
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<ClearIcon />}
                                            onClick={() => {
                                                setPointsFace([]);
                                                setArrowFace(null);
                                                setAngleInput('0');
                                                setDirectionOffsetFace('0');
                                            }}
                                        >
                                            Clear
                                        </StyledButton>
                                    </Box>
                                </ControlBox>
                            </TabPanel>
                        </StyledPaper>

                        {/* Right side - Configuration Form */}
                        <StyledPaper sx={{ height: '100%' }}>
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
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <StyledButton
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        startIcon={<ConnectWithoutContactIcon />}
                                    >
                                        Connect
                                    </StyledButton>
                                    <StyledButton
                                        variant="contained"
                                        color="success"
                                        fullWidth
                                        startIcon={<SaveIcon />}
                                    >
                                        Save
                                    </StyledButton>
                                </Box>
                            </Box>
                        </StyledPaper>
                    </Box>
                </Container>
            </Box>
        </div>
    );
}

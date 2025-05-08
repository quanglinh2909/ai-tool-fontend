import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    FormControlLabel,
    FormControl,
    FormLabel,
    Slider,
    Switch,
    FormControlLabel as MuiFormControlLabel,
    alpha,
    InputAdornment,
    Checkbox,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import ClearIcon from '@mui/icons-material/Clear';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { CameraIcon } from 'lucide-react';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import { Loading } from '@/components/create-camera/Loading';
import { ControlBox, ModernLoadingContainer, PreviewImage, StyledButton, StyledPaper, StyledTab, StyledTabs, StyledTextField } from '@/components/create-camera/styles';
import TabPanel from '@/components/create-camera/tab-panel-camera';
import PolygonDrawer, { Arrow } from './PolygonDrawer';
import TabFace from './tab-face';
import TabPlate from './tab-plate';

export interface ILeftSildeCameraProps {
    theme: any;
    imgRef: React.RefObject<HTMLImageElement>;
    stateCamera: "loading" | "error" | "connected" | "init";
    setCamera: (camera: any) => void;

}

export default function LeftSildeCamera(props: ILeftSildeCameraProps) {
    const { theme, imgRef, stateCamera, setCamera } = props;
    const [tabValue, setTabValue] = useState(0);

    // loai xe ap dung cua nhan dang plate
    const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);

    // bat tat ai
    const [aiEnabledVehicle, setAiEnabledVehicle] = useState(false);
    const [aiEnabledFace, setAiEnabledFace] = useState(false);

    // huong di
    const [directionAngleVehicle, setDirectionAngleVehicle] = useState(0);
    const [directionAngleFace, setDirectionAngleFace] = useState(0);

    // do lech
    const [directionDeviationFace, setDirectionDeviationFace] = useState(0);
    const [directionDeviationVehicle, setDirectionDeviationVehicle] = useState(0);

    // bat tat huong di
    const [enableDirectionFace, setEnableDirectionFace] = useState(false);
    const [enableDirectionVehicle, setEnableDirectionVehicle] = useState(false);

    // toa do diem ve box
    const [pointsVehicle, setPointsVehicle] = useState<{ x: number; y: number }[]>([]);
    const [pointsFace, setPointsFace] = useState<{ x: number; y: number }[]>([]);

    // ve mui ten
    const [arrowFace, setArrowFace] = useState<Arrow | null>(null);
    const [arrowVehicle, setArrowVehicle] = useState<Arrow | null>(null);



    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    // is_detect_plate: boolean
    // is_detect_face: boolean
    // is_direction_face: boolean
    // is_direction_plate: boolean
    // direction_angle_face: number
    // direction_angle_plate: number
    // direction_deviation_face: number
    // direction_deviation_plate: number

    useEffect(() => {
        setCamera((prevCamera: any) => ({
            ...prevCamera,
            setting: {
                is_detect_plate: aiEnabledVehicle,
                is_detect_face: aiEnabledFace,
                is_direction_face: enableDirectionFace,
                is_direction_plate: enableDirectionVehicle,
                direction_angle_face: directionAngleFace,
                direction_angle_plate: directionAngleVehicle,
                direction_deviation_face: directionDeviationFace,
                direction_deviation_plate: directionDeviationVehicle,
                points_face: pointsFace,
                points_plate: pointsVehicle,
            }
        }));
    }, [
        aiEnabledVehicle,
        aiEnabledFace,
        enableDirectionFace,
        enableDirectionVehicle,
        directionAngleFace,
        directionAngleVehicle,
        directionDeviationFace,
        directionDeviationVehicle,
        pointsFace,
        pointsVehicle,

    ]);



    return (
        <StyledPaper sx={{ height: '98%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{
                    position: 'relative',
                    width: '640px',
                    height: '480px',
                }}>
                    {stateCamera === "loading" && (

                        <ModernLoadingContainer>
                            <Loading size="large" color="white" text="Connecting to camera..." />
                        </ModernLoadingContainer>
                    )}

                    {stateCamera === "init" && (
                        <div className="bg-black w-full h-[100%] relative rounded-t-lg flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <div className="text-center px-4">
                                    <CameraIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg">Enter camera details and connect</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {stateCamera === "error" && (
                        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/80">
                            <div className="text-center px-4">
                                <ExclamationCircleIcon className="w-12 h-12 mx-auto mb-4 text-red-500" />
                                <p className="text-lg text-red-300">Không thể kết nối đến camera</p>
                                {/* <button
                                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
                                >
                                    Try Again
                                </button> */}
                            </div>
                        </div>
                    )}

                    {stateCamera === "connected" && (
                        <>
                            <PreviewImage ref={imgRef} alt="Camera Preview" onError={(e) => { }} />
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
                                    arrowAngle={tabValue === 0 ? directionAngleVehicle : directionAngleFace}
                                    arrow={tabValue === 0 ? arrowVehicle : arrowFace}
                                    setArrow={tabValue === 0 ? setArrowVehicle : setArrowFace}
                                    showArrow={tabValue === 0 ? enableDirectionVehicle : enableDirectionFace}
                                />
                            </Box>
                        </>
                    )}
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
                                <DirectionsCarIcon sx={{ fontSize: 20 }} />
                                <span>Nhận dạng biển số</span>
                            </Box>
                        }
                    />
                    <StyledTab
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <VideocamIcon sx={{ fontSize: 20 }} />
                                <span>Nhận dạng khuôn mặt</span>
                            </Box>
                        }
                    />

                </StyledTabs>
            </Box>
            <TabFace tabValue={tabValue}
                aiEnabledFace={aiEnabledFace}
                setAiEnabledFace={setAiEnabledFace}
                directionAngleFace={directionAngleFace}
                setDirectionAngleFace={setDirectionAngleFace}
                enableDirectionFace={enableDirectionFace}
                setEnableDirectionFace={setEnableDirectionFace}
                setPointsFace={setPointsFace}
                theme={theme}
                setArrowFace={setArrowFace}
                directionDeviationFace={directionDeviationFace}
                setDirectionDeviationFace={setDirectionDeviationFace} />

            <TabPlate tabValue={tabValue}
                vehicleTypes={vehicleTypes}
                setVehicleTypes={setVehicleTypes}
                aiEnabledVehicle={aiEnabledVehicle}
                setAiEnabledVehicle={setAiEnabledVehicle}
                directionAngleVehicle={directionAngleVehicle}
                setDirectionAngleVehicle={setDirectionAngleVehicle}
                enableDirectionVehicle={enableDirectionVehicle}
                setEnableDirectionVehicle={setEnableDirectionVehicle}
                setPointsVehicle={setPointsVehicle}
                setArrowVehicle={setArrowVehicle}
                theme={theme}
                directionDeviationVehicle={directionDeviationVehicle}
                setDirectionDeviationVehicle={setDirectionDeviationVehicle} />

        </StyledPaper>
    );
}

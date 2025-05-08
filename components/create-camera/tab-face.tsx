import React, { ChangeEvent } from 'react';
import {
    Box,
    Typography,
    Slider,
    Switch,
    FormControlLabel as MuiFormControlLabel,
    alpha,

} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { ControlBox, StyledButton, } from '@/components/create-camera/styles';
import TabPanel from '@/components/create-camera/tab-panel-camera';
import { Arrow } from './PolygonDrawer';

export interface ITabFaceProps {
    tabValue: number;
    aiEnabledFace: boolean;
    setAiEnabledFace: React.Dispatch<React.SetStateAction<boolean>>;
    directionAngleFace: number;
    setDirectionAngleFace: React.Dispatch<React.SetStateAction<number>>;
    enableDirectionFace: boolean;
    setEnableDirectionFace: React.Dispatch<React.SetStateAction<boolean>>;
    setPointsFace: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>;
    setArrowFace: React.Dispatch<React.SetStateAction<Arrow | null>>;
    theme: any;
    directionDeviationFace: number;
    setDirectionDeviationFace: React.Dispatch<React.SetStateAction<number>>;


}

export default function TabFace(props: ITabFaceProps) {
    const { tabValue, aiEnabledFace, setAiEnabledFace,
        directionAngleFace, setDirectionAngleFace, enableDirectionFace, setEnableDirectionFace, setPointsFace,
        setArrowFace, theme, directionDeviationFace, setDirectionDeviationFace } = props;
    const handleAiToggle = (event: ChangeEvent<HTMLInputElement>) => {
        setAiEnabledFace(event.target.checked);

    };
    const handleDirectionToggle = (event: ChangeEvent<HTMLInputElement>) => {
        setEnableDirectionFace(event.target.checked);

    };



    return (
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
                    Cài đặt nhận dạng khuôn mặt
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
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
                                    checked={enableDirectionFace}
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
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'space-between' }}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2 }}>
                                <Typography sx={{ fontWeight: 500, mb: 1 }}>
                                    Hướng đi
                                </Typography>

                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>

                                <Slider
                                    value={directionAngleFace}
                                    onChange={(event, newValue) => {
                                        setDirectionAngleFace(newValue as number);
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

                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2 }}>
                                <Typography sx={{ fontWeight: 500, mb: 1 }}>
                                    Độ lệch
                                </Typography>

                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>

                                <Slider
                                    value={directionDeviationFace}
                                    onChange={(event, newValue) => {
                                        setDirectionDeviationFace(newValue as number);
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

                        </Box>
                    </Box>
                    {/* )} */}
                    <StyledButton
                        variant="outlined"
                        color="secondary"
                        startIcon={<ClearIcon />}
                        onClick={() => {
                            setPointsFace([]);
                            setArrowFace(null);

                        }}
                    >
                        Clear
                    </StyledButton>
                </Box>
            </ControlBox>
        </TabPanel>
    );
}

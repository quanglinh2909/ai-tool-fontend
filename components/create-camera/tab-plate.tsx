import React, { ChangeEvent } from 'react';
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
    Checkbox,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { ControlBox, StyledButton } from '@/components/create-camera/styles';
import TabPanel from '@/components/create-camera/tab-panel-camera';
import { Arrow } from './PolygonDrawer';

export interface ITapPlateProps {
    tabValue: number;
    vehicleTypes: string[];
    setVehicleTypes: React.Dispatch<React.SetStateAction<string[]>>;
    aiEnabledVehicle: boolean;
    setAiEnabledVehicle: React.Dispatch<React.SetStateAction<boolean>>;
    directionAngleVehicle: number;
    setDirectionAngleVehicle: React.Dispatch<React.SetStateAction<number>>;
    enableDirectionVehicle: boolean;
    setEnableDirectionVehicle: React.Dispatch<React.SetStateAction<boolean>>;
    setPointsVehicle: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>;
    setArrowVehicle: React.Dispatch<React.SetStateAction<Arrow | null>>;
    theme: any;
    directionDeviationVehicle: number;
    setDirectionDeviationVehicle: React.Dispatch<React.SetStateAction<number>>;
}

export default function TabPlate(props: ITapPlateProps) {
    const { tabValue, vehicleTypes, setVehicleTypes,
        aiEnabledVehicle, setAiEnabledVehicle,
        directionAngleVehicle, setDirectionAngleVehicle, enableDirectionVehicle, setEnableDirectionVehicle, setPointsVehicle,
        setArrowVehicle, theme, directionDeviationVehicle, setDirectionDeviationVehicle } = props;

    const handleVehicleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setVehicleTypes(prev => {
            if (prev.includes(value)) {
                return prev.filter(type => type !== value);
            }
            return [...prev, value];
        });
    };

    const handleDirectionToggle = (event: ChangeEvent<HTMLInputElement>) => {
        setEnableDirectionVehicle(event.target.checked);

    };
    const handleAiToggle = (event: ChangeEvent<HTMLInputElement>) => {
        setAiEnabledVehicle(event.target.checked);
    };

    return (
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
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
                                    checked={enableDirectionVehicle}
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
                                    value={directionAngleVehicle}
                                    onChange={(event, newValue) => {
                                        setDirectionAngleVehicle(newValue as number);
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
                                    value={directionDeviationVehicle}
                                    onChange={(event, newValue) => {
                                        setDirectionDeviationVehicle(newValue as number);
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
                    <StyledButton
                        variant="outlined"
                        color="secondary"
                        startIcon={<ClearIcon />}
                        onClick={() => {
                            setPointsVehicle([]);
                            setArrowVehicle(null);

                        }}
                    >
                        Clear
                    </StyledButton>
                </Box>
            </ControlBox>
        </TabPanel>

    );
}

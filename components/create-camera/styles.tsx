import {
    Box,
    Paper,
    Tabs,
    Tab,
    TextField,
    Button,
    alpha,
    Theme,

} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
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

export const PreviewImage = styled('img')(({ theme }: { theme: Theme }) => ({
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

export const StyledTab = styled(Tab)(({ theme }: { theme: Theme }) => ({
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

export const StyledTabs = styled(Tabs)(({ theme }: { theme: Theme }) => ({
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

export const ControlBox = styled(Box)(({ theme }: { theme: Theme }) => ({
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

export const StyledButton = styled(Button)(({ theme }: { theme: Theme }) => ({
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

export const StyledTextField = styled(TextField)(({ theme }: { theme: Theme }) => ({
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

export const ModernLoadingContainer = styled('div')(({ theme }: { theme: Theme }) => ({
    background: '#000',
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
}));



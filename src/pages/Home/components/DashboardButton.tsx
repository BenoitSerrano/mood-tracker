import { Button, IconButton, styled } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../../lib/api/pathHandler';
import { useLanguage } from '../../../lib/translation';

function DashboardButton() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    return (
        <DashboardButtonContainer>
            <IconButtonContainer>
                <IconButton onClick={goToPersonalDashboard} color="primary">
                    <CalendarMonthIcon />
                </IconButton>
            </IconButtonContainer>
            <ButtonWithLabelContainer>
                <Button startIcon={<CalendarMonthIcon />} onClick={goToPersonalDashboard}>
                    {t('home.dashboardButtonLabel')}
                </Button>
            </ButtonWithLabelContainer>
        </DashboardButtonContainer>
    );

    function goToPersonalDashboard() {
        navigate(pathHandler.getRoutePath('PERSONAL_DASHBOARD'));
    }
}

const IconButtonContainer = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));

const ButtonWithLabelContainer = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const DashboardButtonContainer = styled('div')(({ theme }) => ({}));

export { DashboardButton };

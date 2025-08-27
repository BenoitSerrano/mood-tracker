import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useApiCall } from '../../../lib/api/useApiCall';
import { api } from '../../../lib/api';
import { useAlert } from '../../../lib/alert';
import { useLanguage } from '../../../lib/translation';

function FollowButton(props: { friendId: string }) {
    const { t } = useLanguage();
    const { displayAlert } = useAlert();
    const followApiCall = useApiCall({
        apiCall: () => api.addFriend(props.friendId),
        onSuccess: () => {
            displayAlert({ variant: 'success', text: t('userDashboard.successMessage') });
        },
    });
    return (
        <IconButton loading={followApiCall.isLoading} onClick={followApiCall.perform}>
            <PersonAddIcon />
        </IconButton>
    );
}

export { FollowButton };

import { Dialog, styled, Typography } from '@mui/material';
import { emotionMapping, moodApiType } from '../../../types';
import { useLanguage } from '../../../lib/translation';

function MoodDetailDialog(props: { touchedMood: moodApiType | undefined; onClose: () => void }) {
    const { t } = useLanguage();

    return (
        <Dialog open={!!props.touchedMood} onClose={props.onClose}>
            {props.touchedMood && (
                <MinorMood
                    backgroundColor={
                        emotionMapping[props.touchedMood.major][props.touchedMood.minor].color
                    }
                >
                    {t(
                        `shared.emotions.${props.touchedMood.major}.${
                            emotionMapping[props.touchedMood.major][props.touchedMood.minor].key
                        }`,
                    )}
                </MinorMood>
            )}
        </Dialog>
    );
}

const MinorMood = styled(Typography)<{ backgroundColor: string }>(({ theme, backgroundColor }) => ({
    backgroundColor,
    padding: theme.spacing(4),
}));

export { MoodDetailDialog };

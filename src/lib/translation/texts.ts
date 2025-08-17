import { availableLanguageType } from './constants';

const englishText = {
    home: {
        today: 'Today',
        yesterday: 'Yesterday',
    },
    shared: {
        timeMode: {
            day: 'Day',
            week: 'Week',
            month: 'Month',
        },
        dayMoment: {
            morning: 'Morning',
            afternoon: 'Afternoon',
            evening: 'Evening',
        },
        months: {
            january: { short: 'Jan.', long: 'January' },
            february: { short: 'Feb.', long: 'February' },
            march: { short: 'Mar.', long: 'March' },
            april: { short: 'Apr.', long: 'April' },
            may: { short: 'May.', long: 'May' },
            june: { short: 'Jun.', long: 'June' },
            july: { short: 'Jul.', long: 'July' },
            august: { short: 'Aug.', long: 'August' },
            september: { short: 'Sep.', long: 'September' },
            october: { short: 'Oct.', long: 'October' },
            november: { short: 'Nov.', long: 'November' },
            december: { short: 'Dec.', long: 'December' },
        },
        emotions: {
            happiness: {
                content: 'Content',
                cheerful: 'Cheerful',
                happy: 'Happy',
            },
            sadness: {
                down: 'Down',
                sad: 'Sad',
                depressed: 'Depressed',
            },
            anxiety: {
                uncomfortable: 'Uncomfortable',
                anxious: 'Anxious',
                panicked: 'Panicked',
            },
            fury: {
                upset: 'Upset',
                frustrated: 'Frustrated',
                angry: 'Angry',
            },
        },
    },
};

type TranslationTexts = typeof englishText;

const frenchText: TranslationTexts = {
    home: {
        today: "Aujourd'hui",
        yesterday: 'Hier',
    },
    shared: {
        timeMode: {
            day: 'Jour',
            week: 'Semaine',
            month: 'Mois',
        },
        dayMoment: {
            morning: 'Matin',
            afternoon: 'Après-midi',
            evening: 'Soirée',
        },
        months: {
            january: { short: 'Janv.', long: 'Janvier' },
            february: { short: 'Févr.', long: 'Février' },
            march: { short: 'Mars', long: 'Mars' },
            april: { short: 'Avr.', long: 'Avril' },
            may: { short: 'Mai', long: 'Mai' },
            june: { short: 'Juin', long: 'Juin' },
            july: { short: 'Juil.', long: 'Juillet' },
            august: { short: 'Août', long: 'Août' },
            september: { short: 'Sept.', long: 'Septembre' },
            october: { short: 'Oct.', long: 'Octobre' },
            november: { short: 'Nov.', long: 'Novembre' },
            december: { short: 'Déc.', long: 'Décembre' },
        },
        emotions: {
            happiness: {
                content: 'Content',
                cheerful: 'Joyeux',
                happy: 'Heureux',
            },
            sadness: {
                down: 'Mélancolique',
                sad: 'Triste',
                depressed: 'Déprimé',
            },
            anxiety: {
                uncomfortable: 'Stressé',
                anxious: 'Anxieux',
                panicked: 'Paniqué',
            },
            fury: {
                upset: 'Agacé',
                frustrated: 'En colère',
                angry: 'Furieux',
            },
        },
    },
};

const texts: Record<availableLanguageType, TranslationTexts> = {
    en: englishText,
    fr: frenchText,
};

export { texts };

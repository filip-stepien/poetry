import { acceptedLanguages, AcceptedLanguages } from '@payloadcms/translations';
import { cookies } from 'next/headers';

type Props = {
    fallbackLanguage?: AcceptedLanguages;
} & Partial<Record<AcceptedLanguages, string>>;

function isAcceptedLanguage(value: string): value is AcceptedLanguages {
    return acceptedLanguages.includes(value as AcceptedLanguages);
}

async function getLanguage(fallbackLanguage?: AcceptedLanguages): Promise<AcceptedLanguages> {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get('payload-lng')?.value;
    let lang: AcceptedLanguages;

    // if cookie is valid, get its language preference
    if (cookieValue && isAcceptedLanguage(cookieValue)) {
        lang = cookieValue;
    }
    // if cookie is invalid, try to use fallback lang
    else if (fallbackLanguage) {
        lang = fallbackLanguage;
    }
    // if fallback is not provided, use english
    else {
        lang = 'en';
    }

    return lang;
}

export default async function GroupDescription(props: Props) {
    const { fallbackLanguage, ...descriptions } = props;
    const lang = await getLanguage(fallbackLanguage);
    const description = descriptions[lang];

    return (
        description !== undefined && (
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    paddingRight: 8,
                    paddingLeft: 8,
                    fontSize: '0.8em',
                    color: 'var(--theme-elevation-500)'
                }}
            >
                {description}
            </div>
        )
    );
}

import 'server-only';
import { AcceptedLanguages, acceptedLanguages } from '@payloadcms/translations';
import { cookies } from 'next/headers';

export async function getPanelLanguage(
    fallbackLanguage?: AcceptedLanguages
): Promise<AcceptedLanguages> {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get('payload-lng')?.value;
    let lang: AcceptedLanguages;

    // if cookie is valid, get its language preference
    if (cookieValue && acceptedLanguages.includes(cookieValue as AcceptedLanguages)) {
        lang = cookieValue as AcceptedLanguages;
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

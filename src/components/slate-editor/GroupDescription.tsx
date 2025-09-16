import { getPanelLanguage } from '@/services/payload/utils';
import { AcceptedLanguages } from '@payloadcms/translations';

type Props = {
    fallbackLanguage?: AcceptedLanguages;
} & Partial<Record<AcceptedLanguages, string>>;

export default async function GroupDescription(props: Props) {
    const { fallbackLanguage, ...descriptions } = props;
    const lang = await getPanelLanguage(fallbackLanguage);
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

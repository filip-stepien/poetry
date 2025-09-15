import { mimeTypes } from '@/payload/collections/Media';
import { Media } from '@/payload/generated-types';
import Image from 'next/image';

type Props = {
    media: Media;
};

export function Upload({ media }: Props) {
    const { mimeType, url } = media;

    if (!url) {
        console.error('Cannot render media: missing source URL.');
        return;
    }

    if (!mimeType) {
        console.error('Cannot render media: missing MIME type.');
        return;
    }

    if (!mimeTypes.includes(mimeType)) {
        console.error('Cannot render media: invalid MIME type.');
        return;
    }

    const src = process.env.BASE_URL + url;

    if (mimeType.startsWith('image')) {
        return <Image src={src} alt={media.alt ?? ''} width={640} height={360} />;
    } else if (mimeType.startsWith('video')) {
        return (
            <video src={src} controls width={640} height={360}>
                Your browser does not support the video tag.
            </video>
        );
    } else if (mimeType.startsWith('audio')) {
        return (
            <audio src={src} controls>
                Your browser does not support the audio element.
            </audio>
        );
    }
}

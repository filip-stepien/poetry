import { mimeTypes } from '@/payload/collections/Media';
import { Media } from '@/payload/generated-types';
import Image from 'next/image';
import { Alignment } from '../lib/types';
import { ReactNode } from 'react';
import { flexAlignCn } from '../lib/utils';
import { cn } from '@/lib/utils';

type Props = {
    media: Media;
    align: Alignment;
};

export function Upload({ media, align }: Props) {
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
    let element: ReactNode = null;

    if (mimeType.startsWith('image')) {
        element = <Image src={src} alt={media.alt ?? ''} width={640} height={360} />;
    } else if (mimeType.startsWith('video')) {
        element = (
            <video src={src} controls width={640} height={360}>
                Your browser does not support the video tag.
            </video>
        );
    } else if (mimeType.startsWith('audio')) {
        element = (
            <audio src={src} controls>
                Your browser does not support the audio element.
            </audio>
        );
    }

    return element && <div className={cn('w-full', flexAlignCn(align))}>{element}</div>;
}

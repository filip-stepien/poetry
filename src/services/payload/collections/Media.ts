import type { CollectionConfig } from 'payload';

export const mimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'video/mp4',
    'video/webm',
    'video/ogg',
    'audio/mpeg',
    'audio/ogg',
    'audio/wav'
];

export const Media: CollectionConfig = {
    slug: 'media',
    labels: {
        singular: {
            en: 'Media',
            pl: 'Multimedia'
        },
        plural: {
            en: 'Media',
            pl: 'Multimedia'
        }
    },
    access: {
        read: () => true
    },
    upload: {
        staticDir: 'media',
        mimeTypes
    },
    fields: [
        {
            name: 'alt',
            type: 'text'
        }
    ]
};

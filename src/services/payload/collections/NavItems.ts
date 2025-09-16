import type { CollectionConfig } from 'payload';

export const NavItems: CollectionConfig = {
    slug: 'nav-items',
    labels: {
        singular: {
            en: 'Navigation Item',
            pl: 'Element nawigacji'
        },
        plural: {
            en: 'Navigation Items',
            pl: 'Elementy nawigacji'
        }
    },
    admin: {
        useAsTitle: 'label'
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            required: true,
            localized: true
        },
        {
            name: 'url',
            type: 'text',
            required: true
        },
        {
            name: 'order',
            type: 'number'
        }
    ]
};

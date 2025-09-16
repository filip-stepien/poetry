import 'server-only';
import { payload } from '@/services/payload';
import { NavItem } from '@/services/payload/generated-types';
import { Locale } from '@/services/payload/locales';

export type SaveItem<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'> & { id?: number };

function shouldUpdate<T>(item: SaveItem<T>): item is SaveItem<T> & { id: number } {
    return item.id !== undefined;
}

export async function findAllPoems() {
    const data = await payload.find({ collection: 'poems' });
    return data.docs;
}

export async function navItemExistsByLabel(label: string) {
    const data = await payload.find({
        collection: 'nav-items',
        limit: 1,
        where: { label: { equals: label } }
    });

    return data.docs.length > 0;
}

export async function saveNavItem(navItem: SaveItem<NavItem>, locale?: Locale) {
    if (shouldUpdate(navItem)) {
        return await payload.update({
            collection: 'nav-items',
            where: { id: { equals: navItem.id } },
            data: navItem,
            locale
        });
    }

    return await payload.create({
        collection: 'nav-items',
        data: navItem
    });
}

import config from '@payload-config';
import { getPayload } from 'payload';
import { SaveItem, navItemExistsByLabel, saveNavItem } from '@/lib/server/repository';
import { NavItem } from '@/services/payload/generated-types';
import { Locale } from '@/services/payload/locales';

type LocalizedNavItem = Omit<SaveItem<NavItem>, 'label'> & { label: Record<Locale, string> };

async function populateNavItems() {
    const navItems: LocalizedNavItem[] = [
        { label: { en: 'Main page', pl: 'Strona główna' }, url: '/', order: 1 },
        { label: { en: 'Poems', pl: 'Wiersze' }, url: '/', order: 2 }
    ];

    try {
        for (const item of navItems) {
            for (const [locale, label] of Object.entries(item.label)) {
                const exists = await navItemExistsByLabel(label);

                if (!exists) {
                    continue;
                }

                await saveNavItem({ ...item, label }, locale as Locale);
                console.log(`Created navigation item: "${label}" (${locale})`);
            }
        }
    } catch (err) {
        console.error('Failed to create initial navigation items.', err);
        process.exit(1);
    }
}

async function populate() {
    await getPayload({ config });
    await populateNavItems();
    console.log('Payload collections were populated successfully.');
    process.exit(0);
}

populate();

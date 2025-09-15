import 'server-only';
import { payload } from '@/payload';

export async function getPoems() {
    const data = await payload.find({ collection: 'poems' });
    return data.docs;
}

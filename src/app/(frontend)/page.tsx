import RichText from '@/components/rich-text/RichText';
import { getPoems } from '@/lib/data';

export default async function Home() {
    const doc = (await getPoems()).at(0);
    const content = doc?.content;
    console.log(content);

    return (
        <div>
            <RichText content={content} />
        </div>
    );
}

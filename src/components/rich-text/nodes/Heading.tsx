import { ReactNode } from 'react';
import { Alignment } from '../lib/types';
import { cn } from '@/lib/utils';
import { textAlignCn } from '../lib/utils';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
    children: ReactNode;
    align: Alignment;
    tag: HeadingTag;
};

const styles: Record<HeadingTag, string> = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium'
};

export function Heading({ children, align, tag: Tag }: Props) {
    return <Tag className={cn(styles[Tag], textAlignCn(align))}>{children}</Tag>;
}

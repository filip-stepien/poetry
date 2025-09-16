import { ReactNode, JSX } from 'react';
import { Alignment } from '../lib/types';
import { textAlignCn } from '../lib/utils';

type Props = {
    children: ReactNode;
    align: Alignment;
    tag: keyof JSX.IntrinsicElements;
};

export function Aligned({ children, align, tag: Tag }: Props) {
    return <Tag className={textAlignCn(align)}>{children}</Tag>;
}

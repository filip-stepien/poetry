import { ReactNode } from 'react';

type ListTag = 'ol' | 'ul';

type Props = {
    children: ReactNode;
    tag: ListTag;
};

export function List({ children, tag: Tag }: Props) {
    return <Tag className='m-0 list-inside pl-4'>{children}</Tag>;
}

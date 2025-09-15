import { ReactNode } from 'react';

type Props = {
    align: 'left' | 'right' | 'center';
    children: ReactNode;
};

const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
} as const;

export function TextAlign({ align, children }: Props) {
    return <div className={textAlignClasses[align]}>{children}</div>;
}

import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    url: string;
    newTab: boolean;
};

export function Link({ children, url, newTab }: Props) {
    return (
        <a href={url} target={newTab ? '_blank' : undefined}>
            {children}
        </a>
    );
}

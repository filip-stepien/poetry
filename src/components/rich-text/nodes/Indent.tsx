import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export function Indent({ children }: Props) {
    return <div className='pl-4'>{children}</div>;
}

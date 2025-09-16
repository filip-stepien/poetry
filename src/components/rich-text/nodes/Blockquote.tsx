import { ReactNode } from 'react';
import { Alignment } from '../lib/types';
import { cn } from '@/lib/client/utils';
import { flexAlignCn, textAlignCn } from '../lib/utils';
import { IconQuoteFilled } from '@tabler/icons-react';

type Props = {
    children: ReactNode;
    align: Alignment;
};

export function Blockquote({ children, align }: Props) {
    return (
        <div className={cn('w-full', flexAlignCn(align))}>
            <blockquote
                className={cn(
                    textAlignCn(align),
                    'bg-neutral-3 border-neutral-10 p-lg m-0 w-fit min-w-[200px] flex-col border-l-[0.25rem]'
                )}
            >
                <div className='flex h-fit pb-2'>
                    <IconQuoteFilled />
                </div>
                <div>{children}</div>
            </blockquote>
        </div>
    );
}

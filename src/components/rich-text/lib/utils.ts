import { cn } from '@/lib/client/utils';
import { Alignment } from './types';

const textAlignClasses: Record<Alignment, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
};

const flexAlignClasses: Record<Alignment, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
};

export function textAlignCn(align: Alignment) {
    return textAlignClasses[align];
}

export function flexAlignCn(align: Alignment) {
    return cn('flex', flexAlignClasses[align]);
}

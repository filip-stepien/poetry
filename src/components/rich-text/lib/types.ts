import { Media } from '@/services/payload/generated-types';
import { RichTextElement, RichTextCustomElement } from '@payloadcms/richtext-slate';

export type Alignment = 'center' | 'left' | 'right';

// tree returned from rich text editor
export type RichTextRawContent = { [k: string]: unknown }[] | null | undefined;

// exclude unused node types
export type RichTextNodeType = Exclude<
    RichTextElement,
    RichTextCustomElement | 'relationship' | 'textAlign'
>;

// generic nestable rich text node
export type RichTextBaseNode<T extends RichTextNodeType> = {
    type: T;
    textAlign?: 'center' | 'left' | 'right';
    children: RichTextNode[];
};

// leaf node - text node that cannot be nested and usually serves as a boundary in recursive traversal
export type RichTextLeafNode = {
    text: string;
} & Partial<Record<'bold' | 'code' | 'italic' | 'strikethrough' | 'underline', true>>;

// prettier-ignore
// if node type has any additional properties, and them here
export type ExtraRichTextNodeFields<T extends RichTextNodeType> = 
    T extends 'link' ? { url: string; newTab: boolean; linkType: string } :
    T extends 'upload' ? { relationTo: string, value: Media } :
    unknown;

// union of all possible node type properties, allowing typescript to narrow a node by its type
export type RichTextNodeMap = {
    [K in RichTextNodeType]: RichTextBaseNode<K> & ExtraRichTextNodeFields<K>;
};

// union of all possible nodes in tree returned by rich text editor
export type RichTextNode = RichTextLeafNode | RichTextNodeMap[keyof RichTextNodeMap];

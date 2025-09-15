import { Fragment, JSX } from 'react';
import { Text } from '@/components/rich-text/nodes/Text';
import { RichTextElement, RichTextCustomElement } from '@payloadcms/richtext-slate';
import { TextAlign } from './nodes/TextAlign';
import { Media } from '@/payload/generated-types';
import { Upload } from './nodes/Upload';

type RichTextContent = { [k: string]: unknown }[] | null | undefined;

type Props = {
    content: RichTextContent;
};

type Alignment = 'center' | 'left' | 'right';

// exclude unused node types
type NodeType = Exclude<RichTextElement, RichTextCustomElement | 'relationship' | 'textAlign'>;

// generic nestable node
type BaseNode<T extends NodeType> = {
    type: T;
    textAlign?: 'center' | 'left' | 'right';
    children: Node[];
};

// leaf node - text node that cannot be nested and usually serves as a boundary in recursive traversal
type TextNode = {
    text: string;
} & Partial<Record<'bold' | 'code' | 'italic' | 'strikethrough' | 'underline', true>>;

// prettier-ignore
// if node type has any additional properties, and them here
type ExtraNodeFields<T extends NodeType> = 
    T extends 'link' ? { url: string; newTab: boolean; linkType: string } :
    T extends 'upload' ? { relationTo: string, value: Media } :
    unknown;

// union of all possible node type properties, allowing typescript to narrow a node by its type
type NodeMap = {
    [K in NodeType]: BaseNode<K> & ExtraNodeFields<K>;
};

// union of all possible nodes in tree returned by rich text editor
type Node = TextNode | NodeMap[keyof NodeMap];

function isContentValid(content: RichTextContent): content is Node[] {
    return Array.isArray(content);
}

function isTextNode(node: Node): node is TextNode {
    return (node as TextNode).text !== undefined;
}

function isAligned(node: Node): node is Node & { textAlign: Alignment } {
    return (node as { textAlign?: Alignment }).textAlign !== undefined;
}

// recursively render nodes, wrapping them in their corresponding JSX tags
function renderRichTextNode(node: Node, key: string | number) {
    if (isTextNode(node)) {
        return <Text key={key} {...node} />;
    }

    const children = node.children.map(renderRichTextNode);
    let element: JSX.Element;

    switch (node.type) {
        case 'h1':
            element = <h1>{children}</h1>;
            break;
        case 'h2':
            element = <h2>{children}</h2>;
            break;
        case 'h3':
            element = <h3>{children}</h3>;
            break;
        case 'h4':
            element = <h4>{children}</h4>;
            break;
        case 'h5':
            element = <h5>{children}</h5>;
            break;
        case 'h6':
            element = <h6>{children}</h6>;
            break;
        case 'blockquote':
            element = <blockquote>{children}</blockquote>;
            break;
        case 'indent':
            element = <div className='pl-4'>{children}</div>;
            break;
        case 'ol':
            element = <ol>{children}</ol>;
            break;
        case 'ul':
            element = <ul>{children}</ul>;
            break;
        case 'li':
            element = <li>{children}</li>;
            break;
        case 'link':
            element = (
                <a href={node.url} target={node.newTab ? '_blank' : undefined}>
                    {children}
                </a>
            );
            break;
        case 'upload':
            element = <Upload media={node.value} />;
            break;
        default:
            element = <p>{children}</p>;
            break;
    }

    if (isAligned(node)) {
        return (
            <TextAlign key={key} align={node.textAlign}>
                {element}
            </TextAlign>
        );
    }

    return <Fragment key={key}>{element}</Fragment>;
}

export default function RichText({ content }: Props) {
    return isContentValid(content) ? content.map(renderRichTextNode) : null;
}

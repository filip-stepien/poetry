import { Fragment, JSX } from 'react';
import { Text } from '@/components/rich-text/nodes/Text';
import { Upload } from './nodes/Upload';
import { Blockquote } from './nodes/Blockquote';
import { Alignment, RichTextRawContent, RichTextLeafNode, RichTextNode } from './lib/types';
import { Heading } from './nodes/Heading';
import { Indent } from './nodes/Indent';
import { List } from './nodes/List';
import { Link } from './nodes/Link';
import { Aligned } from './nodes/Aligned';

type Props = {
    content: RichTextRawContent;
};

function isContentValid(content: RichTextRawContent): content is RichTextNode[] {
    return Array.isArray(content);
}

function isTextNode(node: RichTextNode): node is RichTextLeafNode {
    return (node as RichTextLeafNode).text !== undefined;
}

function isAligned(node: RichTextNode): node is RichTextNode & { textAlign: Alignment } {
    return (node as { textAlign?: Alignment }).textAlign !== undefined;
}

// recursively render nodes, wrapping them in their corresponding JSX tags
function renderRichTextNode(node: RichTextNode, key: string | number) {
    if (isTextNode(node)) {
        return <Text key={key} {...node} />;
    }

    const children = node.children.map(renderRichTextNode);
    const align = isAligned(node) ? node.textAlign : 'left';
    let element: JSX.Element;

    switch (node.type) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            element = (
                <Heading align={align} tag={node.type}>
                    {children}
                </Heading>
            );
            break;
        case 'blockquote':
            element = <Blockquote align={align}>{children}</Blockquote>;
            break;
        case 'indent':
            element = <Indent>{children}</Indent>;
            break;
        case 'ol':
        case 'ul':
            element = <List tag={node.type}>{children}</List>;
            break;
        case 'li':
            element = (
                <Aligned align={align} tag='li'>
                    {children}
                </Aligned>
            );
            break;
        case 'link':
            element = (
                <Link url={node.url} newTab={node.newTab}>
                    {children}
                </Link>
            );
            break;
        case 'upload':
            element = <Upload align={align} media={node.value} />;
            break;
        default:
            element = (
                <Aligned align={align} tag='p'>
                    {children}
                </Aligned>
            );
            break;
    }

    return <Fragment key={key}>{element}</Fragment>;
}

export default function RichText({ content }: Props) {
    return isContentValid(content) ? content.map(renderRichTextNode) : null;
}

import { ReactNode, Fragment } from 'react';

type Props = {
    text: string;
} & Partial<Record<'bold' | 'code' | 'italic' | 'strikethrough' | 'underline', true>>;

export function Text({ text, bold, code, italic, strikethrough, underline }: Props) {
    if (text === '') {
        return <br />;
    }

    const lines = text.split('\n');

    let content: ReactNode = lines.map((line, i) => (
        <Fragment key={i}>
            {line}
            {i < lines.length - 1 && <br />}
        </Fragment>
    ));

    if (bold) {
        content = <strong>{content}</strong>;
    }

    if (italic) {
        content = <em>{content}</em>;
    }

    if (underline) {
        content = <u>{content}</u>;
    }

    if (strikethrough) {
        content = <s>{content}</s>;
    }

    if (code) {
        content = <code>{content}</code>;
    }

    return content;
}

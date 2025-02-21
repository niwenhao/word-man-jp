interface JapaneseShowProps {
    content: string;
    showRuby?: boolean;
    textStyle: string;
    rubyStyle: string;
}

type ShowPart = {
    text: string;
    ruby: string;
}
export default function JapaneseShow({ content, showRuby, textStyle, rubyStyle }: JapaneseShowProps) {
    const parseContent = (content: string): ShowPart[] => {
        const regex = /\{([^\|]+)\|([^\}]+)\}/g;
        const result: ShowPart[] = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                result.push({ text: content.slice(lastIndex, match.index), ruby: '' });
            }
            result.push({ text: match[1], ruby: match[2] });
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < content.length) {
            result.push({ text: content.slice(lastIndex), ruby: '' });
        }

        return result;
    };

    const showParts = parseContent(content);
    return (
        <>
            {showParts.map((part, index) => (
                <ruby key={index} className={textStyle}>
                    {part.text}
                    { showRuby && <rt className={rubyStyle}>{part.ruby}</rt> }
                </ruby>
            ))}
        </>
    )
}
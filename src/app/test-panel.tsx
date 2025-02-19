import { Question } from "@/types/model-type";
import { useEffect, useState } from "react";
import JapaneseShow from "./japanese-show";

interface TestPanelProps {
    question : Question;
    moveNext?: () => void;
}

type DisplayMode = 1 | 2 | 3 | 4;

export default function TestPanel({question, moveNext}: TestPanelProps) {
    const [displayMode, setDisplayMode] = useState<DisplayMode>(1);

    const textStyle = "text-lg text-center";
    const rubyStyle = "text-sm text-center text-gray-500";

    const displayQuestion = () => {
        if (displayMode === 1) {
            return <div className="h-40">{question.question.replaceAll(/\{([^\}]+)\|[^\}]+\}/g, "$1")}</div>;
        } else {
            return <div className="h-40"><JapaneseShow content={question.question} textStyle={textStyle} rubyStyle={rubyStyle}/></div>;
        }
    }
    
    const displayAnswer = () => {
        if (displayMode === 3) {
            return <div className="h-40">{question.answer.replaceAll(/\{([^\}]+)\|[^\}]+\}/g, "$1")}</div>;
        } else if (displayMode === 4) {
            return <div className="h-40"><JapaneseShow content={question.answer} textStyle={textStyle} rubyStyle={rubyStyle}/></div>;
        } else {
            return <div className="h-40"></div>;
        }
    }

    useEffect(() => {
        console.log("TestPanel => useEffect", question);
        setDisplayMode(1);
    }, [question]);

    const handleClicked = () => {
        if (displayMode === 1) {
            setDisplayMode(2);
        } else if (displayMode === 2) {
            setDisplayMode(3);
        } else if (displayMode === 3) {
            setDisplayMode(4);
        } else if (displayMode === 4) {
            if (moveNext) {
                moveNext();
            } else {
                setDisplayMode(1);
            }
        }
    }
    
    return (
        <div onClick={handleClicked} className="w-full h-full">
            { displayQuestion() }
            { displayAnswer() }
        </div>
    );
}
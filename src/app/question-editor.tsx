/**
 * A component for edit a questioh.
 * It take a textarea for json input as following format:
 * ```
 * {
 *   "question_origin": "絶体絶命",
 *   "question": "{絶体絶命|ぜったいぜつめい}",
 *   "answer": "{逃|に}げる{方法|ほうほう}がなく、{追い詰|おいつ}められた{状態|じょうたい}という{意味|いみ}"
 * }
 * ```
 * It will parse the json and display the question and answer in two areas.
 * a area has many input fields each for a pair of text and furigana. if the text is the same as the furigana, the furigana can be omitted.
 * 
 * Changing for each field of text or furigana will update the json as same as changing the json will update the text and furigana.
 * 
 * @param question The question to edit.
 * @param saveQuestion The function to call when the question is saved.
 */

import React, { useState } from "react";
import JapaneseShow from "./japanese-show";
import { Question } from "@/types/model-type";

type QuestionJson = {
    question_origin?: string;
    question: string;
    answer: string;
}

interface QuestionEditorProps {
    question: Question;
    saveQuestion: (question: Question) => Promise<void>;
}

export default function QuestionEditor(props: QuestionEditorProps) {
    const [jsonInput, setJsonInput] = useState(JSON.stringify({
            question_origin: props.question.question.replace(/\{[^\}]+\|[^\}]+\}/g, ''),
            question: props.question.question,
            answer: props.question.answer
        }
        , null, 2));

    const [question, setQuestion] = useState(props.question);

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonInput(e.target.value);

        try {
            const q = JSON.parse(e.target.value) as QuestionJson;
            setQuestion({ ...question, ...q });
        } catch (error) {
            console.error("Failed to parse JSON:", error);
        }
    }

    return (
        <div>
            <textarea
                rows={10}
                cols={50}
                value={jsonInput}
                onChange={handleJsonChange}
            />
            <div>
                <h3>Question:</h3>
                <div>
                    <JapaneseShow content={question.question} textStyle="text-xl" rubyStyle="text-sm" />
                </div>
            </div>
            <div>
                <h3>Answer:</h3>
                <div>
                    <JapaneseShow content={question.answer} textStyle="text-xl" rubyStyle="text-sm" />
                </div>
            </div>
            <button onClick={async () => await props.saveQuestion(question)}>Save</button>
        </div>
    );
}
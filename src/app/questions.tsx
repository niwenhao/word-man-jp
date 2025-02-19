/**
 * A component that displays a list of questions of a chapter specified by property.
 * 
 * The list of questions is displayed in a <ul>.
 * Each question is displayed in a <li> element.
 * 
 * The first item is fixed to `<ADD>`. When clicked, a new question is added to the list with a dialog question-editor.tsx.
 * 
 * @param chapter The chapter to display questions for.
 * 
 */

import React, { useEffect, useReducer, useState } from "react";
import QuestionEditor from "./question-editor";
import { Dialog, DialogTitle } from "@headlessui/react";
import { addQuestion, getQuestions } from "./background-service";
import { Chapter, Question } from "@/types/model-type";


interface QuestionsProps {
    chapter: Chapter;
    onQuestionSelected?: (question: Question) => void;
}

type Action = { type: "add", data: Question } | { type: "initialize", data: Question[] } | { type: "update", data: Question };


const questionsReducer = (state: Question[], action: Action) => {
    switch (action.type) {
        case "add":
            return [...state, action.data];
        case "initialize":
            return action.data;
        default:
            return state;
    }
};

export default function Questions({ chapter }: QuestionsProps) {
    // Local state for questions and editor visibility
    const [questions, dispatch] = useReducer(questionsReducer, []);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await getQuestions(chapter.id);
            dispatch({ type: "initialize", data: questions });
        };
        fetchQuestions();
    }, [chapter]);

    const newQuestionTemplate = () => ({
        id: -1,
        question: "",
        answer: "",
        chapterId: chapter.id,
    } as Question);

    const [editingQuestion, setEditingQuestion] = useState(newQuestionTemplate());

    const saveQuestionHandler = async (q: Question) => {
        const question = await addQuestion(q);
        dispatch({ type: "add", data: question });
        setEditing(false);
    };

    return (
        <div>
            <ul>
            <li onClick={() => setEditing(true)} style={{ cursor: "pointer", fontWeight: "bold" }}>
                &lt;ADD&gt;
            </li>
            {questions.map((q, index) => (
                <li key={index} onClick={() => {
                    setEditingQuestion(q);
                    setEditing(true);
                }}>
                {/* Render question details - customize as needed */}
                {q.question.replaceAll(/\{[^\}]+\|[^\}]+\}/g, "")}
                </li>
            ))}
            </ul>
            <Dialog open={editing} onClose={() => setEditing(false)} className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="relative bg-white rounded max-w-sm mx-auto p-6">
                <DialogTitle className="text-lg font-bold">Edit Question</DialogTitle>
                <QuestionEditor question={editingQuestion} saveQuestion={saveQuestionHandler} />
                </div>
            </div>
            </Dialog>
        </div>
    );
}
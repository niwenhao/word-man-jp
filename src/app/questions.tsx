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
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { addQuestion, getQuestions } from "./background-service";
import { Chapter, Question } from "@/types/model-type";


interface QuestionsProps {
    chapter: Chapter;
    onQuestionSelected?: (question: Question) => void;
}

type Action = { type: "add", question: Question } | { type: "initialize", questions: Question[] } | { type: "update", question: Question };


const questionsReducer = (state: Question[], action: Action) => {
    switch (action.type) {
        case "add":
            return [...state, action.question];
        case "initialize":
            return action.questions;
        default:
            return state;
    }
};



export default function Questions({ chapter, onQuestionSelected }: QuestionsProps) {

    const newQuestionTemplate = () => ({
        id: -1,
        question: "",
        answer: "",
        chapterId: chapter.id,
    } as Question);

    const [questions, dispatch] = useReducer(questionsReducer, []);
    const [editing, setEditing] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(newQuestionTemplate());
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await getQuestions(chapter.id);
            dispatch({ type: "initialize", questions: questions });
        };
        fetchQuestions();
        setEditingQuestion(newQuestionTemplate());
    }, [chapter]);

    const saveQuestionHandler = async (q: Question) => {
        const question = await addQuestion(q);
        dispatch({ type: "add", question: question });
        setEditing(false);
    };

    const selectQuestionHandler = (q: Question, i: number) => {
        setIndex(i);

        if (onQuestionSelected) {
            onQuestionSelected(q);
        }
    };

    return (
        <div>
            <ul>
            <li onClick={() => setEditing(true)} style={{ cursor: "pointer", fontWeight: "bold" }}>
                &lt;ADD&gt;
            </li>
            {questions.map((q, i) => {
                let style = "w-full p-2 hover:bg-cyan-50";
                if (i === index) {
                    style = "w-full p-2 hover:bg-cyan-50 bg-cyan-50";
                }
                return (
                    <li key={i} className="my-2">
                        <div className="flex justify-between h-10 m-0">
                            <p className={style} onClick={() => selectQuestionHandler(q, i)}>{q.question.replaceAll(/\{([^\}]+)\|[^\}]+\}/g, "$1")}</p>
                            <p className="p-2 w-9 bg-yellow-400 hover:bg-blue-200"
                                    onClick={() => {
                                            setEditingQuestion(q);
                                            setEditing(true);
                                    }}>ED</p>
                        </div>
                    </li>
                )
            })}
                </ul>
            <Dialog open={editing} onClose={() => setEditing(false)} className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <DialogPanel className="relative w-[40rem] bg-white shadow-lg">
                <div className="relative bg-white rounded max-w-sm mx-auto p-6">
                <DialogTitle className="text-lg font-bold">Edit Question</DialogTitle>
                <QuestionEditor question={editingQuestion} saveQuestion={saveQuestionHandler} />
                </div>
                </DialogPanel>
            </div>
            </Dialog>
        </div>
    );
}
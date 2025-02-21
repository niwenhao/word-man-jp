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
import { addQuestion, updateQuestion } from "./background-service";
import { Chapter, Question } from "@/types/model-type";


interface QuestionsProps {
    chapter: Chapter;
    questions: Question[];
    selectedIndex: number;
    onQuestionSelected: (question: Question) => void;
}

type Action = { type: "add", question: Question } | { type: "initialize", questions: Question[] } | { type: "update", question: Question };


const questionsReducer = (state: Question[], action: Action) => {
    switch (action.type) {
        case "add":
            return [...state, action.question];
        case "initialize":
            return action.questions;
        case "update":
            return state.map(q => q.id === action.question.id ? action.question : q);
        default:
            return state;
    }
};



export default function Questions(props: QuestionsProps) {

    const newQuestionTemplate = () => ({
        id: -1,
        question: "",
        answer: "",
        chapterId: props.chapter.id,
    } as Question);

    const [questions, dispatch] = useReducer(questionsReducer, []);
    const [editingQuestion, setEditingQuestion] = useState<Question|undefined>();
    const [index, setIndex] = useState(props.selectedIndex);

    const saveQuestionHandler = async (q: Question) => {
        if (q.id > 0) {
            // update
            const question = await updateQuestion(q);
            dispatch({ type: "update", question: question });
            setEditingQuestion(undefined);
        } else {
            // add
            const question = await addQuestion(q);
            dispatch({ type: "add", question: question });
            setEditingQuestion(undefined);
        }
    };

    const selectQuestionHandler = (q: Question, i: number) => {
        setIndex(i);

        props.onQuestionSelected(q);
    };

    useEffect(() => {
        dispatch({ type: "initialize", questions: props.questions });
    }, [props.questions]);

    useEffect(() => {
        console.log("selectedIndex => ", props.selectedIndex);
        setIndex(props.selectedIndex);
    }, [props.selectedIndex]);

    return (
        <div>
            <ul>
            <li onClick={() => setEditingQuestion(newQuestionTemplate())} style={{ cursor: "pointer", fontWeight: "bold" }}>
                &lt;ADD&gt;
            </li>
            {questions.map((q, i) => {
                return (
                    <li key={i} className="my-2">
                        <div className="flex justify-between h-10 m-0">
                            <p className={`w-full p-2 hover:bg-blue-100 ${i===index ? "bg-blue-200": ""}`} onClick={() => selectQuestionHandler(q, i)}>{q.question.replaceAll(/\{([^\}]+)\|[^\}]+\}/g, "$1")}</p>
                            <p className="p-2 w-9 bg-yellow-400 hover:bg-blue-200"
                                    onClick={() => {
                                            setEditingQuestion(q);
                                    }}>ED</p>
                        </div>
                    </li>
                )
            })}
                </ul>
            <Dialog open={editingQuestion !== undefined} onClose={() => setEditingQuestion(undefined)} className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <DialogPanel className="relative w-[40rem] bg-white shadow-lg">
                <div className="relative bg-white rounded max-w-sm mx-auto p-6">
                <DialogTitle className="text-lg font-bold">Edit Question</DialogTitle>
                { editingQuestion && <QuestionEditor question={editingQuestion} saveQuestion={saveQuestionHandler} /> }
                </div>
                </DialogPanel>
            </div>
            </Dialog>
        </div>
    );
}
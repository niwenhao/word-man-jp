'use client';

import Chapters from "./chapters";

import { useState } from 'react';
import { Chapter, Question } from "@/types/model-type";
import TestPanel from "./test-panel";
import { getQuestions } from "./background-service";
import Questions from "./questions";

interface TopProps {
  chapters: Chapter[];
}


export default function Top(props: TopProps) {

  const [selectedChapter, setSelectedChapter] = useState<Chapter|undefined>();
  const [selectedQuestion, setSelectedQuestion] = useState<Question|undefined>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleChapterSelected = (chapter: Chapter) => {
    getQuestions(chapter.id).then((qs) => {
      console.log("getQuestions => ", qs);
      setSelectedChapter(chapter);
      setSelectedIndex(-1);
      setQuestions(qs);
    });
  };

  const handleQuestionSelected = (question: Question) => {
    setSelectedQuestion(question);
    setSelectedIndex(questions.findIndex(q => q.id === question.id));
  };

  const handleMoveNext = () => {
    console.log(`handleMoveNext => selectedIndex: ${selectedIndex}, questions.length: ${questions.length}`);
    const idx = selectedIndex < questions.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(idx);
    setSelectedQuestion(questions[idx]);
    console.log(`handleMoveNext => selectedIndex: ${selectedIndex}, question: ${selectedQuestion}`);
  };

  return (
    <div className="flex w-full h-full relative">
      <div className="relate left-0 w-[30rem] bg-blue-200 p-2">
        <p className="w-full text-center">章</p>
        <Chapters chapters={props.chapters} onChapterSelected={handleChapterSelected}/>
      </div>
      <div className="relate w-[40rem] bg-blue-100 p-2">
        <p className="w-full text-center">問題</p>
        { selectedChapter && <Questions chapter={selectedChapter} questions={questions} selectedIndex={selectedIndex} onQuestionSelected={handleQuestionSelected}/> }
      </div>
      <div className="relate w-full bg-blue-50 p-2">
        <p className="w-full text-center">問題詳細</p>
        { selectedQuestion && <TestPanel question={selectedQuestion} moveNext={handleMoveNext}/> }
      </div>
    </div>
  );
}
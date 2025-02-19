'use client';

import Chapters from "./chapters";

import { useState } from 'react';
import Questions from "./questions";
import { Chapter, Question } from "@/types/model-type";
import TestPanel from "./test-panel";

interface TopProps {
  chapters: Chapter[];
}


export default function Top(props: TopProps) {

  const [selectedChapter, setSelectedChapter] = useState<Chapter|undefined>();
  const [selectedQuestion, setSelectedQuestion] = useState<Question|undefined>();

  const handleChapterSelected = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  const handleQuestionSelected = (question: Question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="flex w-full h-full relative">
      <div className="relate left-0 w-[30rem] bg-blue-200 p-2">
        <p className="w-full text-center">章</p>
        <Chapters chapters={props.chapters} onChapterSelected={handleChapterSelected}/>
      </div>
      <div className="relate w-[40rem] bg-blue-100 p-2">
        <p className="w-full text-center">問題</p>
        { selectedChapter && <Questions chapter={selectedChapter} onQuestionSelected={handleQuestionSelected}/> }
      </div>
      <div className="relate w-full bg-blue-50 p-2">
        <p className="w-full text-center">問題詳細</p>
        { selectedQuestion && <TestPanel question={selectedQuestion}/> }
      </div>
    </div>
  );
}
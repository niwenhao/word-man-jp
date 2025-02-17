'use client';

import { Chapter, Question } from "@/types/db-types";
import Chapters from "./chapters";

import { useState } from 'react';
import Questions from "./questions";

export default function Top({ chapters}: { chapters: Chapter[]}) {

  const [selectedChapter, setSelectedChapter] = useState<Chapter|undefined>();

  const handleChapterSelected = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  const handleQuestionSelected = (question: Question) => {
    console.log(question);
  };

  return (
    <div className="flex w-full h-full relative">
      <div className="relate left-0 w-[30rem] bg-blue-200 p-2">
        <p className="w-full text-center">章</p>
        <Chapters chapters={chapters} onChapterSelected={handleChapterSelected}/>
      </div>
      <div className="relate w-[40rem] bg-blue-100 p-2">
        <p className="w-full text-center">問題</p>
        { selectedChapter && <Questions chapter={selectedChapter} onQuestionSelected={handleQuestionSelected}/> }
      </div>
      <div className="relate w-full bg-blue-50 p-2">
        <p className="w-full text-center">問題詳細</p>
        
      </div>
    </div>
  );
}
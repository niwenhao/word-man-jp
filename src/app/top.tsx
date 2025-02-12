'use client';

import { Chapter } from "@/types/db-types";
import Chapters from "./chapters";

export default function Top({ chapters}: { chapters: Chapter[]}) {
  return (
    <div className="flex">
      <div className="w-[40rem] bg-blue-200 border-block"><Chapters chapters={chapters} /></div>
      <div className="w-[40rem] bg-blue-100 border-block"></div>
      <div className="w-full bg-blue-50 border-block"></div>
    </div>
  );
}
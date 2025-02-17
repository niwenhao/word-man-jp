export interface Chapter {
  id: number;
  name: string;
  description: string;
  lastUpdate: Date;
  questions?: Question[];
}

export interface Question {
  id: number;
  question: string;
  answer: string;
  chapterId: number;
  chapter: Chapter;
}

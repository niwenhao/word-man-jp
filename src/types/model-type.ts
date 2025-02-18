import { Prisma } from "@prisma/client";


export type Chapter = Prisma.ChapterGetPayload<object>;
export type Question = Prisma.QuestionGetPayload<object>;

export type ChapterWithQuestions = Prisma.ChapterGetPayload<{
    include: {
        questions: true;
    };
}>;

export type QuestionWithChapter = Prisma.QuestionGetPayload<{
    include: {
        chapter: true;
    };
}>;

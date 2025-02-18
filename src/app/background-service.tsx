'use server';

import { Chapter, ChapterWithQuestions, Question, QuestionWithChapter } from '@/types/model-type';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addChapter(chapter: Chapter): Promise<ChapterWithQuestions> {
    return await prisma.chapter.create({
        data: {
            name: chapter.name,
            description: chapter.description
        },
        include: {
            questions: true
        }
    }
    );
}

export async function updateChapter(chapter: Chapter): Promise<ChapterWithQuestions> {
    return await prisma.chapter.update({
        where: { id: chapter.id },
        data: {
            name: chapter.name,
            description: chapter.description
        },
        include: {
            questions: true
        }
    });
}

export async function addQuestion(question: Question): Promise<QuestionWithChapter> {
    return await prisma.question.create({
        data: {
            question: question.question,
            answer: question.answer,
            chapterId: question.chapterId,
        },
        include: {
            chapter: true,
        },
    });
}

export async function updateQuestion(question: Question): Promise<QuestionWithChapter> {
    return await prisma.question.update({
        where: { id: question.id },
        data: {
            question: question.question,
            answer: question.answer
        },
        include: {
            chapter: true,
        },
    });
}
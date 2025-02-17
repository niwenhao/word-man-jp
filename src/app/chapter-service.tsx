'use server';

import { Chapter, Question } from "@/types/db-types";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addChapter(chapter: Chapter): Promise<Chapter> {
    return await prisma.chapter.create({
        data: {
            name: chapter.name,
            description: chapter.description
        },
    });
}

export async function updateChapter(chapter: Chapter): Promise<Chapter> {
    return await prisma.chapter.update({
        where: { id: chapter.id },
        data: {
            name: chapter.name,
            description: chapter.description
        },
    });
}

export async function addQuestion(question: Question): Promise<Question> {
    const q = await prisma.question.create({
        data: {
            question: question.question,
            answer: question.answer,
            chapterId: question.chapterId
        },
    });
    return { ...q, chapter: question.chapter };
}

export async function updateQuestion(question: Question): Promise<Question> {
    return await prisma.question.update({
        where: { id: question.id },
        data: {
            question: question.question,
            answer: question.answer
        },
    });
}
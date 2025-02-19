'use server';

import { Chapter, Question } from '@/types/model-type';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getChapters() {
    return await prisma.chapter.findMany({
    });
}

export async function getQuestions(chapterId: number) {
    return await prisma.question.findMany({
        where: {
            chapterId: chapterId
        }
    });
}

export async function addChapter(chapter: Chapter) {
    return await prisma.chapter.create({
        data: {
            name: chapter.name,
            description: chapter.description
        },
    });
}

export async function updateChapter(chapter: Chapter) {
    return await prisma.chapter.update({
        where: { id: chapter.id },
        data: {
            name: chapter.name,
            description: chapter.description
        },
    });
}

export async function addQuestion(question: Question) {
    return await prisma.question.create({
        data: {
            question: question.question,
            answer: question.answer,
            chapterId: question.chapterId,
        },
    });
}

export async function updateQuestion(question: Question) {
    return await prisma.question.update({
        where: { id: question.id },
        data: {
            question: question.question,
            answer: question.answer
        },
    });
}
'use server';

import { Chapter } from "@/types/db-types";
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
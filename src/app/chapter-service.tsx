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
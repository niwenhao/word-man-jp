'use server';

import { Chapter } from "@/types/db-types";

const prisma = require("@prisma/client");
export async function addChapter(chapter: Chapter): Promise<Chapter> {
    return await prisma.chapter.create({ data: {
        name: chapter.name,
        description: chapter.description
    } });
}
import { Chapter } from '@/types/db-types';
import { PrismaClient } from '@prisma/client';
import Top from './top';

const prisma = new PrismaClient();

async function getChapters() {
  const chapters = await prisma.chapter.findMany({
    include: {
      questions: true,
    },
  });
  return chapters as Chapter[];
}

export default async function Home() {
  return (
    <Top chapters={await getChapters()} />
  );
}

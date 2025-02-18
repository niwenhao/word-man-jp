import { PrismaClient } from '@prisma/client';
import Top from './top';

const prisma = new PrismaClient();

async function getChapters() {
  return await prisma.chapter.findMany({
    include: {
      questions: true,
    },
  });
}

export default async function Home() {
  return (
    <Top chapters={await getChapters()} />
  );
}

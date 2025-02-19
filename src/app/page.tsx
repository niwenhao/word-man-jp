import Top from './top';
import { getChapters } from './background-service';

export default async function Home() {
  return (
    <Top chapters={await getChapters()} />
  );
}

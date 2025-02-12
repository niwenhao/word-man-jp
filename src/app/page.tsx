'use client';



export default function Home({ chapters }: { chapters: any[]}) {
  return (
    <div className="flex">
      <div className="w-[50em] bg-blue-300 border border-black">{chapters.length}</div>
      <div className="w-[50em] bg-blue-200 border border-black">Panel 2</div>
      <div className="w-full bg-blue-50 border border-black">Panel 3</div>
    </div>
  );
}

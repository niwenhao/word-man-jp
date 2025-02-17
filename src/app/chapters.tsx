'use client';
/**
 * @fileoverview Chapters component
 * 
 * This component displays a list of chapters.
 * Get the initial list of chapters from the parameter chapters.
 * 
 * The first item is fixed to `<ADD>`, When click it, a new chapter is added to the list with a dialog.
 */

import { Chapter } from "@/types/db-types";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useReducer, useState } from 'react';
import ChapterEditor from "./chapter-editor";
import { addChapter, updateChapter } from "./chapter-service";

interface ChaptersProps {
    chapters: Chapter[];
    onChapterSelected?: (chapter: Chapter) => void;
}

export default function Chapters(props: ChaptersProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editedChapter, setEditedChapter] = useState<Chapter>({ id: 0, name: '', description: '', lastUpdate: new Date() });

    type ChapterAction = { type: string, data: Chapter };

    const [chapterList, dispatcher] = useReducer((state: Chapter[], action: ChapterAction) => {
        switch (action.type) {
            case 'add':
                return [...state, action.data];
            case 'update':
                return state.map(c => c.id === action.data.id ? action.data : c);
            default:
                return state;
        }
    }, props.chapters);

    const handleSaveChapter = async (c: Chapter) => {
        if (c.id <= 0) {
            const r = await addChapter(c);
            dispatcher({ type: 'add', data: r });
        } else {
            const r = await updateChapter(c);
            dispatcher({ type: 'update', data: r });
        }
        setDialogOpen(false);
    }

    return (
        <div>
            <div className="w-100 bg-blue-200 border-block">
                <Dialog as="div" open={dialogOpen} className="fixed inset-0 z-10 overflow-y-auto" onClose={() => { setDialogOpen(false) }}>
                    <div className="flex items-center justify-center min-h-screen">
                        <DialogPanel className="relative w-[40rem] bg-white shadow-lg">
                            <DialogTitle as="h3" className="text-lg font-medium text-gray-900">Add a new chapter</DialogTitle>
                            <ChapterEditor editChapter={editedChapter} saveChapter={async (c) => await handleSaveChapter({...{id: 0, lastUpdate: new Date()}, ...c})} />
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
            <div className="w-full bg-blue-50 border-block">
                <div>
                    <div className="flex justify-between mt-2 mb-2">
                        <p title="Add a chapter" onClick={() => {
                                setEditedChapter({ id: 0, name: '', description: '', lastUpdate: new Date(), questions: [] });
                                setDialogOpen(true)
                            }} className=" text-black-800 hover:text-red-800 inline">ADD</p>
                    </div>
                    {chapterList.map((chapter) => (
                        <div key={chapter.id} className="flex justify-between mt-2 mb-2">
                            <p title={chapter.description} className=" text-black-800 hover:text-red-800 inline" onClick={() => props.onChapterSelected?.(chapter)}>{chapter.name} </p>
                            <p className="inline w-5 text-2xl bg-yellow-200 hover:bg-blue-200 handle-pointer"
                               onClick={() => {
                                      setEditedChapter(chapter);
                                      setDialogOpen(true);
                               }}>✍</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
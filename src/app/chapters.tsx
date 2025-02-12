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
import { useState } from 'react';

export default function Chapters({ chapters }: { chapters: Chapter[] }) {
    const [ dialogOpen, setDialogOpen ] = useState(false);

    return (
        <div className="flex">
            <div className="w-[40rem] bg-blue-200 border-block">
                    <Dialog as="div" open={dialogOpen} className="fixed inset-0 z-10 overflow-y-auto" onClose={() => { setDialogOpen(false) }}>
                        <div className="flex items-center justify-center min-h-screen">
                            <DialogPanel className="relative w-[40rem] bg-white shadow-lg">
                                <DialogTitle as="h3" className="text-lg font-medium text-gray-900">Add a new chapter</DialogTitle>
                                <input type="text" className="border border-gray-300" />
                                <button className="border border-gray-300">Add</button>
                            </DialogPanel>
                        </div>
                    </Dialog>
            </div>
            <div className="w-full bg-blue-50 border-block">
                <div className="flex justify-between">
                    <h1>Chapters</h1>
                    <button onClick={() => setDialogOpen(true)}>ADD</button>
                </div>
                <div>
                    {chapters.map((chapter) => (
                        <div key={chapter.id}>
                            <h2>{chapter.name}</h2>
                            <p>{chapter.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
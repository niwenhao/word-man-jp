import { Chapter} from '@/types/model-type';
import React, { useState } from 'react';

export type ChapterEditorProps = {
    editChapter: Chapter;
    saveChapter: (c: Chapter) => Promise<void>;
};

const ChapterEditor = ({ editChapter, saveChapter }: ChapterEditorProps) => {
    const [chapter, setChapter] = useState(editChapter);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setChapter({ ...chapter, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveChapter(chapter);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='bg-blue-100 w-[40rem]'>
                <label htmlFor="name">Name:</label>
                <input
                    className='border-black w-full'
                    type="text"
                    id="name"
                    name="name"
                    value={chapter.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className='bg-blue-100 w-[40rem]'>
                <label htmlFor="description">Description:</label>
                <textarea
                    className='border-black w-full h-[10rem]'
                    id="description"
                    name="description"
                    value={chapter.description}
                    onChange={handleInputChange}
                />
            </div>
            <div className='bg-white w-[40rem] flex justify-center'>
            <button type="submit"
                    className='w-50 bg-blue-500 text-white hover:bg-blue-400 p-2 rounded m-4'
                    >Save Chapter</button>
            </div>
        </form>
    );
};

export default ChapterEditor;
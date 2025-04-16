
import { setCategory } from '@/utils/appSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const buttonList = [
    'All',
    'JavaScript',
    'Live',
    'Music',
    'Song',
    'Vlogs',
    'Trending',
    'Programming',
    'Comedy',
    'Gaming',
    'News',

];


function ButtonList() {
    const [active, setActive] = useState("All")
    const dispatch = useDispatch()

    const vedioByTag = (tag) => {
        if (active != tag) {
            dispatch(setCategory(tag))
            setActive(tag)

        }

    }
    return (
        <div className="w-full overflow-x-auto mt-4">
            <div className="flex flex-wrap gap-4 px-4 py-2 min-w-full">
                {buttonList.map((item, idx) => (
                    <button
                        onClick={() => vedioByTag(item)}
                        key={idx}
                        className={`${active === item ? "bg-black text-white font-semibold" : "bg-gray-200 text-gray-700"} flex-grow px-6 py-2 min-w-max rounded-full text-sm hover:bg-gray-300 active:bg-gray-400 transition`}
                    >
                        {item}
                    </button>

                ))}
            </div>
        </div>
    );
}

export default ButtonList;

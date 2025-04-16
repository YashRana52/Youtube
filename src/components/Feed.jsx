import React from 'react';
import ButtonList from './ButtonList';
import VedioContainer from './VedioContainer';
import { useSelector } from 'react-redux';

function Feed() {
    const open = useSelector((store) => store.app.open); // Get sidebar state

    return (
        <div
            className={`mr-5 h-full flex flex-col transition-all duration-300`}
            style={{
                marginLeft: open ? 240 : 72, // match Sidebar width
            }}
        >
            {/* ButtonList stays fixed inside Feed */}
            <div className='sticky top-0 bg-white z-10 pb-2'>
                <ButtonList />
            </div>

            <div className='overflow-y-auto flex-1'>
                <VedioContainer />
            </div>
        </div>
    );
}

export default Feed;

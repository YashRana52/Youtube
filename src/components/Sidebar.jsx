import React from 'react';
import { CiHome } from 'react-icons/ci';
import { SiYoutubeshorts, SiYoutubemusic } from 'react-icons/si';
import {
    MdSubscriptions,
    MdHistory,
    MdVideoLibrary,
    MdOutlineWatchLater,
    MdThumbUpOffAlt,
    MdSettings,
    MdFlag,
    MdHelpOutline,
    MdFeedback,
    MdDownload,

} from 'react-icons/md';
import { FaUserCircle, FaPaperclip, } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import store from '@/utils/store';

const sidebarSections = [
    {
        title: '',
        items: [
            { icon: <CiHome size={22} />, label: 'Home' },
            { icon: <SiYoutubeshorts size={22} />, label: 'Shorts' },
            { icon: <MdSubscriptions size={22} />, label: 'Subscriptions' },
        ],
    },
    {
        title: '',
        items: [
            { icon: <FaUserCircle size={22} />, label: 'You' },
            { icon: <MdHistory size={22} />, label: 'History' },
            { icon: <MdVideoLibrary size={22} />, label: 'Your Videos' },
            { icon: <MdOutlineWatchLater size={22} />, label: 'Watch Later' },
            { icon: <MdThumbUpOffAlt size={22} />, label: 'Liked Videos' },
            { icon: <FaPaperclip size={24} />, label: 'Your Clips' },
        ],
    },
    {
        title: 'More from YouTube',
        items: [{ icon: <SiYoutubemusic size={22} />, label: 'YouTube Music' }],
    },
    {
        title: '',
        items: [
            { icon: <MdSettings size={22} />, label: 'Settings' },
            { icon: <MdFlag size={22} />, label: 'Report history' },
            { icon: <MdHelpOutline size={22} />, label: 'Help' },
            { icon: <MdFeedback size={22} />, label: 'Send feedback' },
            { icon: <MdDownload size={22} />, label: 'Download' },
        ],
    },
    {
        title: 'Your Subscriptions',
        items: [{ icon: <FaUserCircle size={22} />, label: 'Yash Rana' }],
    },


];
function Sidebar() {
    const open = useSelector((store) => store.app.open);

    return (
        <div
            className={`fixed top-[60px] left-0 bottom-0 h-[calc(100vh-60px)] shadow-sm border-r bg-white z-20 transition-all duration-300
                        ${open ? "w-[240px]" : "w-[72px]"}`}
        >
            {/* Scrollable content inside */}
            <div
                className="h-full overflow-y-auto p-2"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#999 transparent',
                }}
            >
                {sidebarSections.map((section, i) => (
                    <div key={i} className="mb-4">
                        {open && section.title && (
                            <p className="text-xs text-gray-500 mb-2 uppercase">
                                {section.title}
                            </p>
                        )}
                        {section.items.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200
                                            ${open ? "justify-start" : "justify-center"}`}
                            >
                                {item.icon}
                                {open && (
                                    <span className="text-sm whitespace-nowrap">
                                        {item.label}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}



export default Sidebar;

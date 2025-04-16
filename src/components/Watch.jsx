import API_KEY from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import LiveChat from './LiveChat';
import { useDispatch } from 'react-redux';
import { setMessage } from '@/utils/chatSlice';

function Watch() {
    const [video, setVideo] = useState(null);
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('v');
    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    // Fetch Single Video Details
    const getSingleVideo = async () => {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`);
            const videoData = res.data.items[0];
            setVideo(videoData);
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    // Fetch Channel Subscribers
    const getChannelSubscribers = async (channelId) => {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`);
            const count = res.data.items[0]?.statistics?.subscriberCount;
            setSubscriberCount(count);
        } catch (err) {
            console.error("Error fetching subscriber count:", err);
        }
    };

    // Format subscriber count (1M, 200K)
    const formatSubscriberCount = (count) => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        } else {
            return count;
        }
    };

    const sendMessage = async () => {
        dispatch(setMessage({
            name: "Yash Rana",
            message: input

        }))
        setInput("")


    }

    useEffect(() => {
        if (videoId) getSingleVideo();
    }, [videoId]);

    useEffect(() => {
        if (video?.snippet?.channelId) {
            getChannelSubscribers(video.snippet.channelId);
        }
    }, [video]);

    return (
        <div className="ml-64 px-6 py-4 bg-white min-h-screen flex gap-4 overflow-auto">
            <div className="flex flex-col w-full max-w-7xl flex-grow">
                {/* Video Player */}
                <div className="w-full aspect-video mb-4" style={{ minWidth: "640px" }}>
                    <iframe
                        className="w-full h-full rounded-xl"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>

                {/* Title and Channel Info */}
                <h1 className="text-2xl font-bold">{video ? video.snippet.title : 'Loading...'}</h1>
                <div className="flex items-center justify-between mt-3">
                    {/* Channel Info */}
                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="avatar"
                            className="w-12 h-12 rounded-full border border-gray-300"
                        />
                        <div>
                            <h2 className="font-semibold text-lg">{video?.snippet?.channelTitle || "Channel Name"}</h2>
                            <p className="text-sm text-gray-500">
                                {subscriberCount ? `${formatSubscriberCount(subscriberCount)} subscribers` : "Loading..."}
                            </p>
                        </div>
                    </div>

                    {/* Subscribe Button */}
                    <button className="px-6 py-2 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700">
                        Subscribe
                    </button>
                </div>

                {/* Like, Share, Download Buttons */}
                <div className="flex gap-4 mt-4">
                    <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                        <AiOutlineLike size={24} /> Like
                    </button>
                    <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                        <FaRegShareFromSquare size={24} /> Share
                    </button>
                    <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                        ⬇️ Download
                    </button>
                </div>

                {/* Comment Input */}
                <div className="flex items-center mt-6 gap-3">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="user-avatar"
                        className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-400"
                    />
                    <input className='flex-1 border-b py-2 mt-2 border-gray-300 outline-none' type='text' placeholder='Add a public comment...' />
                    <div className='bg-gray-200 p-2 rounded-full cursor-pointer ml-3'>
                        <IoMdSend />
                    </div>
                </div>
            </div>

            {/* Live Chat Sidebar */}
            <div className="w-[30%]" style={{ minWidth: "350px" }}>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className="text-lg font-semibold">Top Chat</h1>
                    <BsThreeDotsVertical />
                </div>
                <div className='overflow-y-auto h-[30rem] border border-gray-200 rounded-xl px-2 flex flex-col-reverse'>
                    <LiveChat />
                </div>

                {/* Chat Input Box */}
                <div className="mt-4 flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="user-avatar"
                        className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-400"
                    />
                    <input onChange={(e) => setInput(e.target.value)} value={input} className="flex-1 border-b py-2 mt-2 border-gray-300 outline-none" type="text" placeholder="Type a message..." />
                    <div className="bg-gray-200 p-2 rounded-full cursor-pointer ml-3">
                        <IoMdSend onClick={sendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watch;

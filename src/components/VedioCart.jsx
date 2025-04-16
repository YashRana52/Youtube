import API_KEY from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Format views like 1.2M
function formatViews(views) {
    const num = parseInt(views, 10);
    if (isNaN(num)) return '105K views';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M views';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K views';
    return num + ' views';
}

// Time ago formatting
function timeAgo(dateString) {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ];
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
}

function VideoCard({ item }) {
    const [yticon, setYticon] = useState(null);

    useEffect(() => {
        const fetchChannelIcon = async () => {
            try {
                const res = await axios.get(
                    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=${API_KEY}`
                );
                const iconUrl = res.data.items[0]?.snippet?.thumbnails?.high?.url;
                setYticon(iconUrl);
            } catch (error) {
                console.error('Error fetching channel icon:', error);
            }
        };
        fetchChannelIcon();
    }, [item.snippet.channelId]);

    return (
        <div className="w-full p-2 cursor-pointer hover:scale-[1.02] transition-transform duration-200">
            <img
                src={item.snippet.thumbnails.medium.url}
                alt="Video thumbnail"
                className="w-full h-44 object-cover rounded-lg"
            />
            <div className="flex mt-3">
                <img
                    src={yticon || '/default-avatar.png'}
                    alt="Channel avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                    <h2 className="text-base font-semibold leading-tight line-clamp-2">
                        {item.snippet.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {item.snippet.channelTitle}
                    </p>
                    <p className="text-sm text-gray-500">
                        {formatViews(item.statistics?.viewCount)} • {timeAgo(item.snippet.publishedAt)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;

import API_KEY, { YOUTUBE_VIDEO_API } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import VedioCart from './VedioCart';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeVedio } from '@/utils/appSlice';

function VedioContainer() {
    const dispatch = useDispatch();
    const { vedio, category } = useSelector((store) => store.app);

    const fetchYoutubeVedio = async () => {
        try {
            const res = await axios.get(YOUTUBE_VIDEO_API, {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    chart: 'mostPopular',
                    regionCode: 'IN',
                    maxResults: 50,
                    key: API_KEY,
                },
            });

            dispatch(setHomeVedio(res?.data?.items));
        } catch (error) {
            console.error(error);
        }
    };


    const fetchVideoByCategory = async (category) => {
        try {
            const res = await axios.get(
                `https://www.googleapis.com/youtube/v3/search`,
                {
                    params: {
                        part: 'snippet',
                        maxResults: 50,
                        q: category,
                        type: 'video',
                        key: API_KEY,
                    },
                }
            );
            dispatch(setHomeVedio(res?.data?.items));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (category === 'All') {
            fetchYoutubeVedio();
        } else {
            fetchVideoByCategory(category);
        }
    }, [category]);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4'>
            {vedio?.map((item) => (
                <Link
                    key={item.id?.videoId || item.id}
                    to={`/watch?v=${item.id?.videoId || item.id}`}
                >
                    <VedioCart item={item} />
                </Link>
            ))}
        </div>
    );
}

export default VedioContainer;

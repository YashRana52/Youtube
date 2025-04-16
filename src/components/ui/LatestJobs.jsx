/* eslint-disable */
import React from 'react';
import LatestJobCards from '../LatestJobCards';

function LatestJobs() {
    const Job = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className='max-w-7xl mx-auto my-20 px-5'>

            <h1 className='text-4xl font-bold text-center mb-8'>
                <span className='text-[#6A38C2]'>Latest & Top</span> Career Opportunities
            </h1>


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {Job.slice(0, 6).map((item, index) => (
                    <LatestJobCards key={index} />
                ))}
            </div>
        </div>
    );
}

export default LatestJobs;

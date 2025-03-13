import React, { useEffect, useState } from 'react';
import HotJobCards from '../HotJobCards/HotJobCards';

const HotJobs = () => {

    const [jobs,setJobs] =useState([])
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs`)
        .then(res => res.json())
        .then(data => {
            setJobs(data)
        })
    },[])
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
                jobs.map(job => <HotJobCards key={job.id} job={job}></HotJobCards>)
            }
        </div>
    );
};

export default HotJobs;
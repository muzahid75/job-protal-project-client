import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/UseAuth';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const MyPostedJob = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [user.email])

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="p-6 bg-base-100 rounded-xl shadow-lg">
            <div className="overflow-x-auto">
                <table className="table table-zebra table-md">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="text-base">Job Title</th>
                            <th className="text-base">Deadline</th>
                            <th className="text-base">Applicants</th>
                            <th className="text-base">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {jobs.map((job, idx) => (
                            <tr key={idx} className="hover:bg-base-200 transition-colors">
                                {/* Job Title */}
                                <td>
                                    <div className="font-semibold text-gray-800">{job.title}</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {job.company}
                                    </div>
                                </td>
                                
                                {/* Deadline */}
                                <td>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        {formatDate(job.applicationDeadline)}
                                    </div>
                                </td>
                                
                                {/* Applicants */}
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="badge badge-info gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {job.applicants || 0}
                                        </div>
                                    </div>
                                </td>
                                
                                {/* View Applicants Action */}
                                <td>
                                    <Link to={`/viewApplication/${job._id}`}>
                                    <button 
                                        className="btn btn-ghost btn-sm hover:bg-blue-50 text-blue-600"
                                    >
                                        <EyeIcon className="h-5 w-5 mr-2" />
                                        View Applicants
                                    </button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {jobs.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 mb-4">No job postings found</div>
                        <button className="btn btn-primary">
                            Create New Job Post
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};



export default MyPostedJob;
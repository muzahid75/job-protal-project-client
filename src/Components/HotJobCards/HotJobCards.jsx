import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HotJobCards = ({ job }) => {
    const { _id, company_logo, company, location, jobType, description, title, requirements, salaryRange } = job;

    return (
        <div className="max-w-lg mx-auto my-6 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
            {/* Company Header Section */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                    <img
                        className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
                        src={company_logo}
                        alt={company}
                    />
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 truncate">{company}</h2>
                        <div className="flex items-center text-sm text-indigo-600 mt-1">
                            <CiLocationOn className="flex-shrink-0" />
                            <span className="ml-1.5 truncate">{location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Details Section */}
            <div className="px-6 py-4 flex-1">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{title}</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                        {jobType}
                    </span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                        ⏳ Closing Soon
                    </span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {description}
                </p>

                {/* Requirements Grid */}
                <div className="flex gap-3 mt-4 flex-wrap">
                    {
                        requirements.map((requirement, index) => (
                            <p key={index} className="px-4 py-2 rounded-2xl text-sm text-gray-700 border border-gray-300 hover:bg-gray-300 transition duration-200">
                                {requirement}
                            </p>
                        ))
                    }
                </div>
            </div>

            {/* Footer Section for Salary & Apply Button */}
            <footer className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mt-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <FaDollarSign className="w-5 h-5 text-indigo-600" />
                        <span className="text-lg font-bold text-gray-900">
                            {salaryRange.min} - {salaryRange.max}
                            <span className="text-sm text-gray-500 ml-1">{salaryRange.currency}</span>
                        </span>
                    </div>
                    <Link to={`/jobs/${_id}`}><button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                        Apply Now →
                    </button></Link>
                </div>
            </footer>
        </div>
    );
};

export default HotJobCards;

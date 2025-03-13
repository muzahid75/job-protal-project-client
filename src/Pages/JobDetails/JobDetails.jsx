import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaFileAlt, FaRegHandPointer } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const JobDetails = () => {
    const job = useLoaderData();
    const Navigate = useNavigate();
    const { _id, company_logo, company, location, jobType, description, title, requirements, salaryRange } = job;

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-blue-100 via-purple-50 to-indigo-100 rounded-2xl p-8 shadow-2xl border border-white/20"
            >
                {/* Company Header */}
                <div className="flex items-center gap-6 mb-10 group">
                    <motion.img 
                        src={company_logo} 
                        alt={company} 
                        className="w-28 h-28 object-contain border-4 border-white rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300"
                        whileHover={{ rotate: 2 }}
                    />
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                            {title}
                        </h1>
                        <div className="flex items-center gap-3 text-lg text-gray-700">
                            <span className="font-semibold bg-white/80 px-3 py-1 rounded-full shadow-sm">{company}</span>
                            <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                                <FaMapMarkerAlt className="text-blue-600 text-sm" />
                                <span className="text-gray-600">{location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/90 p-5 rounded-xl shadow-lg backdrop-blur-sm border border-white/20"
                    >
                        <div className="flex items-center gap-3 text-gray-600 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FaBriefcase className="text-blue-600 text-xl" />
                            </div>
                            <span className="font-semibold">Job Type</span>
                        </div>
                        <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                            <FaRegHandPointer className="text-blue-500" />
                            {jobType}
                        </span>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/90 p-5 rounded-xl shadow-lg backdrop-blur-sm border border-white/20"
                    >
                        <div className="flex items-center gap-3 text-gray-600 mb-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <FaMoneyBillWave className="text-green-600 text-xl" />
                            </div>
                            <span className="font-semibold">Salary</span>
                        </div>
                        <p className="text-gray-800 font-bold text-lg">
                            {salaryRange.min} - {salaryRange.max} 
                            <span className="text-gray-600 text-sm ml-1">{salaryRange.currency}</span>
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/90 p-5 rounded-xl shadow-lg backdrop-blur-sm border border-white/20"
                    >
                        <div className="flex items-center gap-3 text-gray-600 mb-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <FaFileAlt className="text-purple-600 text-xl" />
                            </div>
                            <span className="font-semibold">Requirements</span>
                        </div>
                        <p className="text-gray-800 font-bold text-lg">
                            <span className="text-purple-600">{requirements?.length}</span> key qualifications
                        </p>
                    </motion.div>
                </div>

                {/* Job Description */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm">
                        <FaFileAlt className="text-blue-600 text-2xl" />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Job Description
                        </span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg bg-white/80 p-6 rounded-xl shadow-sm">
                        {description}
                    </p>
                </div>

                {/* Requirements */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm">
                        <FaBriefcase className="text-blue-600 text-2xl" />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Key Requirements
                        </span>
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {requirements?.map((req, index) => (
                            <motion.li 
                                key={index}
                                whileHover={{ x: 5 }}
                                className="flex items-start gap-3 text-gray-700 bg-white/90 p-4 rounded-xl shadow-sm border-l-4 border-blue-500"
                            >
                                <span className="text-blue-500 text-lg mt-1">▹</span>
                                <span className="text-gray-800 font-medium">{req}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Apply Button */}

<motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
    onClick={() => Navigate(`/jobApply/${_id}`)}
>
    <FaRegHandPointer className="text-xl" />
    Apply Now
</motion.button>
            </motion.div>
        </div>
    );
};

export default JobDetails;
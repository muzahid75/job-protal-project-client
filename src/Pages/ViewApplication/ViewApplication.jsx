import { useLoaderData } from 'react-router-dom';
import { HiOutlineMail, HiBriefcase, HiLink, HiDocumentDownload } from 'react-icons/hi';
import Swal from 'sweetalert2';


const ViewApplication = () => {
    const applications = useLoaderData();

    const handleStatusChange = (e,id) => {
        //console.log(e.target.value,id);

        const data = {
            status : e.target.value
        }
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`${import.meta.env.VITE_API_BASE_URL}/job-application/${id}`,requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Applicant status successfully done",
                    icon: "success",
                    confirmButtonText: "Cool",
                });
            }
        })
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Applications</h2>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">#</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Applicant</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Position</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Links</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {applications.map((data, idx) => (  // Changed from datas to applications
                                <tr key={data._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600">{idx + 1}</td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <HiOutlineMail className="text-blue-500" />
                                            <span className="text-sm font-medium text-gray-800">
                                                {data.email}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <HiBriefcase className="text-green-500" />
                                            <span className="text-sm text-gray-700">
                                                {data.jobTitle || 'Position Not Specified'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <a
                                                href={data.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <HiLink className="inline" />
                                                GitHub
                                            </a>
                                            <a
                                                href={data.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 transition-colors"
                                            >
                                                <HiDocumentDownload className="inline" />
                                                Resume
                                            </a>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="relative">
                                            <select
                                            onChange={(e)=>handleStatusChange(e,data._id)}
                                            defaultValue={data.status || 'pending'}
                                            className="bg-transparent border-none focus:ring-0 cursor-pointer">
                                                <option value="pending">Pending</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="interviewed">Interviewed</option>
                                                <option value="hired">Hired</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {applications.length === 0 && (  // Changed from datas to applications
                        <div className="text-center py-8">
                            <p className="text-gray-500">No applications found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewApplication;
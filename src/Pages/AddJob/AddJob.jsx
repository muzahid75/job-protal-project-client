import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth";

const AddJob = () => {

    const Navigate = useNavigate();
    const {user}=useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = Object.fromEntries(formData.entries());

        entries.requirements = entries.requirements
            ? entries.requirements.split('\n').filter(line => line.trim())
            : [];
        entries.responsibilities = entries.responsibilities
            ? entries.responsibilities.split('\n').filter(line => line.trim())
            : [];

        if (entries.applicationDeadline) {

            // Or if you need to ensure valid date formatting:
            entries.applicationDeadline = new Date(entries.applicationDeadline + 'T00:00:00')
                .toISOString()
                .split('T')[0];
        }

        entries.salaryRange = {
            min: Number(entries.min),
            max: Number(entries.max),
            currency: entries.currency
        };
        if (entries.salaryRange.min > entries.salaryRange.max) {
            alert("Maximum salary must be greater than minimum salary");
            return;
        }
        // eslint-disable-next-line no-unused-vars
        const { min, max, currency, ...finalEntryData } = entries;

        // //console.log('Form Data:', entries);
        //console.log('Form Data:', finalEntryData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalEntryData)
        };

        fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'successful!',
                        text: 'coffee added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
                Navigate('/')
            });
    };


    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-100">
                Create Job Posting
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                            Job Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Enter job title"
                            className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                            Location<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            required
                            placeholder="Enter location"
                            className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                        />
                    </div>
                    {/* Application Deadline Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                            Application Deadline<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="applicationDeadline"
                            required
                            className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            min={new Date().toISOString().split('T')[0]}
                            // For initial value in YYYY-MM-DD format
                            defaultValue="2024-12-15"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                            Job Type<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="jobType"
                            required
                            className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 appearance-none 
        bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMTUgMTJsLTQgNCA0IDR6Ii8+PC9zdmc+')] 
        bg-no-repeat bg-[length:24px] bg-[right_1rem_center]"
                        >
                            <option value="" selected disabled>Select Job Type --</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Remote">Remote</option>
                            <option value="On-site">On-site</option>
                        </select>
                    </div>


                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                            Category<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            required
                            className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 appearance-none 
        bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMTUgMTJsLTQgNCA0IDR6Ii8+PC9zdmc+')] 
        bg-no-repeat bg-[length:24px] bg-[right_1rem_center]"
                        >
                            <option selected disabled>Select Category -- </option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>

                </div>

                {/* Salary Range Section */}
                <div className="pt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Salary Range</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                                Minimum Salary<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="min"
                                required
                                className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                                Maximum Salary<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="max"
                                required
                                className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                                Currency<span className="text-red-500">*</span>
                            </label>
                            <select
                                name="currency"
                                required
                                className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 
        appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMTUgMTJsLTQgNCA0IDR6Ii8+PC9zdmc+')] 
        bg-no-repeat bg-[length:24px] bg-[right_1rem_center]"
                            >
                                <option selected disabled>Select Currency -- </option>
                                <option value="bdt">BDT (৳)</option>
                                <option value="usd">USD ($)</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Description Section */}
                <div className="pt-8">
                    <label className="block text-sm font-semibold text-gray-700 tracking-wide mb-3">
                        Job Description<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        required
                        name="description"
                        placeholder="Describe the job responsibilities and expectations..."
                        className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                </div>
                {/* company  */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                        Company<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="company"
                        required
                        placeholder="Enter job title"
                        className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                    />
                </div>

                {/* Requirements Section */}
                <div className="pt-8">
                    <label className="block text-sm font-semibold text-gray-700 tracking-wide mb-3">
                        Requirements<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        required
                        name="requirements"
                        placeholder="The job requirements put new line"
                        className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                </div>
                {/* Responsibilities Section */}
                <div className="pt-8">
                    <label className="block text-sm font-semibold text-gray-700 tracking-wide mb-3">
                        Responsibilities<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        required
                        name="responsibilities"
                        placeholder="The job responsibilities put new line"
                        className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                </div>
                {/* hr email */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                        HR Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="hr_email"
                        defaultValue={user.email}
                        required
                        placeholder="Enter HR Email"
                        className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                {/* hr name  */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                        HR Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="hr_name"
                        required
                        placeholder="Enter HR Name"
                        className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                {/* Company logo  */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                        Company Logo<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        name="company_logo"
                        required
                        placeholder="Enter Company logo url"
                        className="w-full px-4 py-3 rounded-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t border-gray-100">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-blue-100"
                    >
                        Create Job Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;
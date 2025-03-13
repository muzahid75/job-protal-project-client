import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const JobApply = () => {

    const {id}=useParams();
    //console.log(id);
    const Navigate =useNavigate();

    const {user}=useAuth();
    // //console.log(user)

    const handleSubmit=(e)=>{
        e.preventDefault();
        const form =e.target;
        const resume = form.resume.value;
        const linkedin = form.linkedin.value;
        const github = form.github.value;

        const jobApplication ={
            job_id: id,
            email: user.email,
            resume,
            linkedin,
            github
        }
        //console.log(jobApplication);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobApplication)
        };

        fetch(`${import.meta.env.VITE_API_BASE_URL}/job-application`, requestOptions)
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
                Navigate('/myapplication')
            });
    }
    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enter URLs</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="url"
          name="resume"
          placeholder="Enter reaume url"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          name="linkedin"
          placeholder="Enter linkedin url"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          name="github"
          placeholder="Enter github url"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </form>
    </div>
    );
};

export default JobApply;
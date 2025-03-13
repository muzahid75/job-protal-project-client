import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import team1 from '../../assets/Team/team1.jpg'
import team2 from '../../assets/Team/team2.jpg'

const Banner = () => {

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <motion.img
                        src={team1}
                        className="border-l-8 border-b-8 border-blue-500 max-w-sm rounded-t-[40px] rounded-br-[40px] shadow-2xl"
                        initial={{ y: "10%" }} // Starts slightly left
                        animate={{ y: "-5%" }} // Moves slightly right
                        transition={{
                            duration: 5, // Slower movement
                            repeat: Infinity, // Infinite loop
                            repeatType: "reverse", // Moves back and forth
                        }}
                    />
                    <motion.img
                        src={team2}
                        className="border-l-8 border-b-8 border-blue-500 max-w-sm rounded-t-[40px] rounded-br-[40px] shadow-2xl"
                        initial={{ x: "20%" }} // Starts slightly left
                        animate={{ x: "40%" }} // Moves slightly right
                        transition={{
                            duration: 5, // Slower movement
                            repeat: Infinity, // Infinite loop
                            repeatType: "reverse", // Moves back and forth
                        }}
                    />
                </div>
                <div className='flex-1'>
                    <motion.h1
                        className="text-5xl font-bold text-blue-600"
                        initial={{ x: '0%', opacity: 0 }}
                        animate={{
                            x: 100,
                            opacity: 1,
                            scale: 1.1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 25,
                            duration: 4.0,
                            repeat: Infinity, // Infinite animation loop
                            repeatType: "reverse", // Reverse animation after each cycle
                        }}
                        style={{
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        New <motion.span
                            initial={{ color: '#3498db' }} // Starting color (blue)
                            animate={{
                                color: ['#3498db', '#e74c3c', '#f39c12', '#2ecc71'], // Transition through multiple colors
                            }}
                            transition={{
                                duration: 3, // Total time for one cycle of color change
                                repeat: Infinity, // Infinite loop
                                repeatType: 'reverse', // Reverse the color transition each time
                            }}
                        >
                            Job
                        </motion.span> For You!
                    </motion.h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
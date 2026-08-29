import { ArrowRight, Play } from "iconsax-react"
import { Link } from "react-router-dom"

const CalltoAction = () => {
    return (
        <section className="w-full  mx-auto px-4 py-20">
            {/* Header */}
            <div className="text-center max-w-7xl relative mx-auto w-full rounded-3xl  bg-primary h-[500px] md:h-[400px] lg:h-[580px]">
                <img src="./logoo.png" alt="logo" className="absolute -top-24 -left-24 w-80 opacity-10 rotate-12" />
                <img src="./logoo.png" alt="logo" className="absolute top-10 left-1/3 w-72 opacity-10 -rotate-6" />
                <img src="./logoo.png" alt="logo" className="absolute top-1/2 right-0 w-96 opacity-10" />
                <img src="./logoo.png" alt="logo" className="absolute bottom-0 left-1/4 w-80 opacity-10 rotate-45" />
                <img src="./logoo.png" alt="logo" className="absolute -bottom-24 right-1/3 w-72 opacity-10" />

                <div className="absolute rounded-3xl inset-0 bg-black/50" />

                <div className="flex relative z-10 flex-col md:flex-row items-center justify-center md:justify-start w-full h-full  text-white">
                    <div className="p-6 sm:p-10 md:p-16 lg:p-20 text-left w-full max-w-md xl:max-w-xl">
                        <h1 className="text-2xl md:text-2xl font-bold  text-white">A Learning Dashboard Designed for Success</h1>
                        <p className='mt-4'>Stay organized with a personalized dashboard that keeps your courses, assignments, assessments, certificates, and progress in one place.</p>

                        <div className=" flex flex-col  gap-4 mt-10">
                            <Link to='/login'>
                                <button className="bg-white flex justify-center items-center gap-2 text-primary px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition duration-300"><ArrowRight size="22" color="#34C759" />See Dashboard</button>
                            </Link>
                            <Link to='/signup'>
                                <button className="border-2 flex justify-center items-center gap-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition duration-300"><Play size="22" color="white" />Start Learning</button>
                            </Link>
                        </div>

                    </div>

                    <div className="hidden md:flex" >
                        <img src="./MacBook.png" alt="logo" className="absolute bottom-0 -right-10 xl:right-0 w-[500px] lg:w-[800px] object-contain" />

                    </div>
                </div>







            </div>



        </section>
    );
};

export default CalltoAction;
import { ArrowRight, Play } from "iconsax-react"
import { Link } from "react-router-dom"

export default function Hero() {

    return (
        <div className="bg-white md:mb-5">
            <div className="h-screen bg-white text-black items-center justify-center flex flex-col ">
                <div className="max-w-7xl relative  mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-2 flex flex-col">
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2">
                            <span className="h-2 w-2 rounded-full bg-green-600"></span>
                            <p className="text-sm font-medium text-green-700">
                                Build Real Skills for the Future
                            </p>
                        </div>
                    </div>
                    <h2 className="text-center text-4xl  md:text-6xl font-semibold ">Learn Practical Skills, Build Real Projects, <span className="text-primary">Launch Your Career. </span></h2>
                    <p className="text-center text-md md:text-xl">Talent Faculty is a collaborative learning platform designed to help students and aspiring professionals gain real-world experience through expert-led courses, hands-on projects, mentorship, and measurable learning outcomes.</p>
                </div>
                <div className="flex items-center gap-5 ">
                    <Link to='/signup'>
                        <button className="p-3 flex bg-primary rounded-xl text-white"><Play size="22" color="#d9e3f0" />Start Learning</button>
                    </Link>

                    <Link to='#Explore'>
                        <button className="border flex items-center justify-center border-gray-300 p-3 rounded-xl">  <ArrowRight size="22" color="#555555" />
                            Explore Program
                        </button>
                    </Link>

                </div>
            </div>

            <div className="bg-white text-center text-black  px-5  ">
                <div className="  justify-center flex flex-col items-center text-center gap-5">
                    <h1 className="text-xl text-gray-600">Trusted by ambitious learners and forward-thinking organizations</h1>
                    <img src="./supon.png" />
                </div>
            </div>
        </div>

    )

};
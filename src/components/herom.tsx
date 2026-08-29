

export default function Herom() {

    return (
        <div className="lg:h-screen md:h-[600px] h-[800px] bg-white text-black text-left justify-center flex flex-col md:flex md:flex-row max-w-7xl mx-auto px-5">
            <div className="relative md:w-1/2 justify-center  space-y-6 flex flex-col">
                <h2 className="text-left text-4xl  lg:text-6xl font-semibold ">Meet the people behind <span className="text-primary">Talent Faculty. </span></h2>
                <p className="text-left text-md lg:text-xl">Great products are built by people who bring different skills, perspectives and ideas to the table. Meet the designers, developers and creatives who contributed to making Talent Faculty possible.</p>
            </div>

            <div className="  justify-center md:w-1/2 flex flex-col ">

                <img src="./herom.png" className="w-full full" />
            </div>
        </div>
    )

};
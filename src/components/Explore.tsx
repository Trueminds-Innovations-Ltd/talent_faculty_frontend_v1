
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft2, ArrowRight2, ArrowRight } from 'iconsax-react';

const LearningPaths = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    interface LearningPath {
        id: string;
        title: string;
        image: string;
        courses: number;
        projects: number;
    }



    const learningPaths: LearningPath[] = [
        {
            id: 'product-design',
            title: 'Product Design',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80',
            courses: 8,
            projects: 12,
        },
        {
            id: 'frontend-development',
            title: 'Frontend Development',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=400&q=80',
            courses: 10,
            projects: 15,
        },
        {
            id: 'backend-development',
            title: 'Backend Development',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
            courses: 8,
            projects: 14,
        },
        {
            id: 'product-management',
            title: 'Product Management',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80',
            courses: 6,
            projects: 10,
        },
        {
            id: 'product-management',
            title: 'Product Management',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80',
            courses: 6,
            projects: 10,
        },
    ];

    const steps = [
        {
            id: 0,
            number: '01',
            title: "Sign Up",
            description: "Create your account.",

        },
        {
            id: 1,
            number: '02',
            title: "Join the Program ",
            description: "Choose your preferred learning path.",
        },
        {
            id: 2,
            number: '03',
            title: "Learn & Build ",
            description: "Complete lessons, assignments, and projects.",
        },
        {
            id: 3,
            number: '04',
            title: "Graduate",
            description: "Receive your certificate and portfolio-ready experience.",
        },

    ];



    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', updateScrollState);
        window.addEventListener('resize', updateScrollState);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, []);

    const scrollByCard = (direction: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const card = el.querySelector<HTMLElement>('[data-card]');
        const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
        el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
    };

    return (
        <section className="w-full max-w-7xl mx-auto rounded-2xl     bg-white px-10 ">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6 md:px-5">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Explore Learning Paths
                    </h2>
                    <p className="text-md text-gray-500 mt-1">
                        Choose the path that aligns with your career goals.
                    </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={() => scrollByCard('left')}
                        disabled={!canScrollLeft}
                        aria-label="Scroll to previous learning paths"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 hover:text-gray-600 transition-colors"
                    >
                        <ArrowLeft2 size={18} color='#555555' variant="Linear" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByCard('right')}
                        disabled={!canScrollRight}
                        aria-label="Scroll to next learning paths"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
                    >
                        <ArrowRight2 size={18} color='#f1f5f9' variant="Linear" />
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mb-20"
            >
                {learningPaths.map((path) => (
                    <article
                        key={path.id}
                        data-card
                        className="snap-start shrink-0 w-[220px] sm:w-[calc(25%-12px)] rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                        <div className="h-32 w-full overflow-hidden bg-gray-100">
                            <img
                                src={path.image}
                                alt={path.title}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-gray-900 text-sm">
                                {path.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {path.courses} Courses
                                <span className="mx-1.5 text-gray-300">|</span>
                                {path.projects} Projects
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">

                <h2 className="text-3xl font-bold md:text-center text-gray-900">
                    Your Learning Journey, <span className="text-primary">Four Steps</span>
                </h2>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:mb-46">
                {steps.map((work) => (
                    <div
                        className="group relative bg-[#0578340D] rounded-2xl p-8 shadow-sm hover:shadow-sm  transition-all duration-500 hover:-translate-y-2 cursor-pointer" >

                        <div className="relative flex flex-col">
                            <h1 className="text-xl text-gray-900 mb-3">{work.number}</h1>

                            <h3 className="text-md xl:text-xl font-bold text-gray-900 mb-3">{work.title}</h3>
                            <p className="text-gray-600 text-sm xl:text-base  ">{work.description}</p>
                            <div className="flex items-center justify-between">
                                <ArrowRight size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LearningPaths;
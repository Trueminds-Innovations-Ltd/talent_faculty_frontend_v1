
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft2, ArrowRight2, } from 'iconsax-react';

const Name = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    interface Name {
        id: string;
        title: string;
        img: string;
        name: string;
        projects: string;
    }


    const name: Name[] = [
        {
            id: 'sarah-amos',
            title: 'Sarah Amos',
            img: "/james.jpg",
            name: 'Graphics Design',
            projects: "Skytop Media",
        },
        {
            id: 'frontend-development',
            title: 'James Okafor',
            img: "/james.jpg",
            name: 'Frontend Development',
            projects: "TechBridge",
        },
        {
            id: 'backend-development',
            title: 'Ada Nwachukwu',
            img: "/james.jpg",
            name: 'Backend Development',
            projects: "CodeCraft Ltd",
        },
        {
            id: 'product-management-1',
            title: 'Emeka Uche',
            img: "/james.jpg",
            name: 'Product Management',
            projects: "Launchpad HQ",
        },
        {
            id: 'product-management-2',
            title: 'Chioma Bello',
            img: "/james.jpg",
            name: 'UI/UX Design',
            projects: "PixelWorks",
        },
        {
            id: 'product-management-3',
            title: 'Tunde Adeyemi',
            img: "/james.jpg",
            name: 'Data Science',
            projects: "Insightful Co",
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
        <section className="w-full max-w-7xl mx-auto rounded-2xl     bg-white md:px-3 px-10">
            <div className="flex items-start justify-between gap-4 mb-6 md:px-5">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Meet your Mentors
                    </h2>
                    <p className="text-md text-gray-500 mt-1">
                        Learn directly from experienced professionals passionate about helping you grow.
                    </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={() => scrollByCard('left')}
                        disabled={!canScrollLeft}
                        aria-label="Scroll to previous name"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 hover:text-gray-600 transition-colors"
                    >
                        <ArrowLeft2 size={18} color='#555555' variant="Linear" />
                    </button>

                    <button
                        type="button"
                        onClick={() => scrollByCard('right')}
                        disabled={!canScrollRight}
                        aria-label="Scroll to next name"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
                    >
                        <ArrowRight2 size={18} color='#f1f5f9' variant="Linear" />
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mb-20"
            >
                {name.map((path) => (
                    <article
                        key={path.id}
                        data-card
                        className="shrink-0 w-[280px] md:w-[320px] rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                        <div className="h-[400px] w-full relative overflow-hidden  inset-0 bg-gray-100">
                            <img
                                src={path.img}
                                alt={path.title}
                                loading="lazy"
                                className="w-full h-full absolute top-0 left-0 object-cover"
                            />
                            <div className="p-3 flex flex-col absolute bottom-0">
                                <h3 className="font-semibold  text-white text-md">
                                    {path.title}
                                </h3>
                                <p className="text-sm text-gray-300 mt-1">
                                    {path.name}
                                    <span className="mx-1.5 text-gray-300">|</span>
                                    {path.projects}
                                </p>
                            </div>
                        </div>

                    </article>
                ))}
            </div>


        </section>
    );
};

export default Name;







import { useRef, useState, useEffect } from 'react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import Reveal from './common/Reveal';

const Name = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    interface Mentor {
        id: string;
        title: string;
        img: string;
        name: string;
        projects: string;
    }

    const name: Mentor[] = [
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
        <section className="w-full max-w-7xl mx-auto rounded-2xl bg-white px-4 sm:px-8 py-10 overflow-hidden">
            <Reveal animation="slide-down" delay={100}>
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Meet your Mentors
                        </h2>
                        <p className="text-base text-gray-500 mt-1">
                            Learn directly from experienced professionals passionate about helping you grow.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => scrollByCard('left')}
                            disabled={!canScrollLeft}
                            aria-label="Scroll to previous mentor"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 hover:text-gray-700 transition cursor-pointer"
                        >
                            <ArrowLeft2 size={18} color='#555555' variant="Linear" />
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollByCard('right')}
                            disabled={!canScrollRight}
                            aria-label="Scroll to next mentor"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-dark transition cursor-pointer"
                        >
                            <ArrowRight2 size={18} color='#f1f5f9' variant="Linear" />
                        </button>
                    </div>
                </div>
            </Reveal>

            {/* Mentor Cards Track */}
            <Reveal animation="slide-up" delay={200}>
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto scroll-smooth mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2"
                >
                    {name.map((path) => (
                        <article
                            key={path.id}
                            data-card
                            className="shrink-0 w-[260px] sm:w-[300px] rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="h-[380px] w-full relative overflow-hidden bg-gray-100">
                                <img
                                    src={path.img}
                                    alt={path.title}
                                    loading="lazy"
                                    className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-108 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                                <div className="p-5 flex flex-col absolute bottom-0 left-0 right-0 text-white">
                                    <h3 className="font-bold text-lg text-white group-hover:text-primary-light transition-colors">
                                        {path.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-200 mt-1 flex items-center gap-1.5">
                                        <span>{path.name}</span>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-emerald-300 font-medium">{path.projects}</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Reveal>
        </section>
    );
};

export default Name;

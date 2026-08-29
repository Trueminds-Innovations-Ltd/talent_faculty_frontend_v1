import { Link } from 'react-router-dom'
import {
    Facebook,
    Instagram,
    Youtube,
    Xrp
} from 'iconsax-react';
import Reveal from './common/Reveal';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Programs', href: '/' },
        { name: 'Courses', href: '/' },
        { name: 'Mentors', href: '/' },
        { name: 'Certificates', href: '/' },
        { name: 'Pricing', href: '/' },
    ];

    const companyLinks = [
        { name: 'About us', href: '/' },
        { name: 'Careers', href: '/' },
        { name: 'Blog', href: '/' },
        { name: 'News', href: '/' },
        { name: 'Partners', href: '/' },
    ];

    const supportLinks = [
        { name: 'Help Center', href: '/' },
        { name: 'FAQs', href: '/' },
        { name: 'Privacy Policy', href: '/' },
        { name: 'Terms of Service', href: '/' },
        { name: 'Contact', href: '/' },
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', color: '#1877F2' },
        { icon: Xrp, href: 'https://linkedin.com', color: '#0A66C2' },
        { icon: Youtube, href: 'https://youtube.com', color: '#FF0000' },
        { icon: Instagram, href: 'https://instagram.com', color: '#E4405F' },
        { icon: Xrp, href: 'https://x.com', color: '#333' },
    ];

    return (
        <footer id='footer' className="bg-[#057834] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Main Footer Content */}
                <Reveal animation="slide-up" delay={100}>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-6 lg:gap-12">
                        {/* Brand Section */}
                        <div className="space-y-3 lg:col-span-2">
                            <div className="flex items-center gap-2">
                                <img
                                    width={80}
                                    height={42}
                                    src='./logoo.png'
                                    alt="Talent Faculty Logo"
                                />
                            </div>
                            <h2 className="text-white text-base font-bold">
                                Turning Learning Into Real-World Experience.
                            </h2>

                            <p className='text-gray-200 text-sm leading-relaxed'>
                                Join thousands of learners building practical skills and preparing for successful careers.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3 pt-2">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 bg-white/10 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    >
                                        <social.icon
                                            size={16}
                                            color='white'
                                            className="text-gray-300 group-hover:text-gray-900 transition-colors"
                                            variant="Bold"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-base text-white">
                                Platform
                            </h3>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="group flex items-center text-sm text-gray-200 hover:text-white transition-colors"
                                        >
                                            <span className="group-hover:translate-x-1.5 transition-transform">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-base text-white">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {companyLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="group flex items-center text-sm text-gray-200 hover:text-white transition-colors"
                                        >
                                            <span className="group-hover:translate-x-1.5 transition-transform">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-base text-white">
                                Support
                            </h3>
                            <ul className="space-y-3">
                                {supportLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="group flex items-center text-sm text-gray-200 hover:text-white transition-colors"
                                        >
                                            <span className="group-hover:translate-x-1.5 transition-transform">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter & Contact */}
                        <div className="space-y-3 lg:col-span-2">
                            <h3 className="font-bold text-base text-white">
                                Stay Updated
                            </h3>

                            <p className="text-gray-200 text-sm">
                                Receive updates on new programs, events, and career opportunities.
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full border border-white/30 rounded-2xl sm:rounded-full p-1.5 gap-2 bg-black/10">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-white text-sm placeholder:text-gray-300 outline-none"
                                />

                                <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-5 py-2.5 text-sm whitespace-nowrap transition-all duration-300 hover:scale-102 cursor-pointer shadow-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14m-6-6 6 6-6 6"
                                        />
                                    </svg>
                                    <span>Subscribe</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-white/15">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/80 text-xs">
                            © {currentYear} Talent Faculty. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style >{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
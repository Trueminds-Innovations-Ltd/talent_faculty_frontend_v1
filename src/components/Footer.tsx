import { Link } from 'react-router-dom'
import {
    Facebook,
    Instagram,
    Youtube,
    Xrp
} from 'iconsax-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Programs', href: '/' },
        { name: 'Courses', href: '/' },
        { name: 'Montors', href: '/' },
        { name: 'Certificate', href: '/' },
        { name: 'Pricing', href: '/' },
    ];

    const companyLinks = [
        { name: 'About us', href: '/' },
        { name: 'Careers', href: '/' },
        { name: 'Blog', href: '/' },
        { name: 'News', href: '/' },
        { name: 'Prartners', href: '/' },
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
        <footer id='footer' className=" bg-[#057834] overflow-hidden">


            <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 xl:grid-cols-7  gap-4 lg:gap-15">

                    {/* Brand Section */}
                    <div className="space-y-2 lg:col-span-2">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img
                                width={80}
                                height={42}
                                src='./logoo.png'
                                alt="Learning Illustration"

                            />
                        </div>
                        <h2 className="text-white">
                            Turning Learning Into Real-World Experience.
                        </h2>

                        <p className='text-gray-300 text-sm leading-relaxed'>
                            Join thousands of learners building practical skills and preparing for successful careers.</p>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-1">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
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
                        <h2 className="font-bold text-lg text-white inline-block">
                            Platform

                        </h2>
                        <ul className="space-y-4">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="group flex items-center gap-5 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-lg text-white  inline-block">
                            Company
                        </h2>
                        <ul className="space-y-4">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                    >

                                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-lg text-white  inline-block">
                            Support
                        </h2>
                        <ul className="space-y-4">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="space-y-3 lg:col-span-2">
                        <h2 className="font-bold text-lg text-white">
                            Stay Updated
                        </h2>

                        <p className="text-gray-300 text-sm">
                            Receive updates on new programs, events, and career opportunities.
                        </p>

                        <div className="flex  flex-row items-stretch sm:items-center w-full border border-white/30 rounded-full p-2 gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 min-w-0 bg-transparent px-3 py-4 text-white placeholder:text-gray-300 outline-none"
                            />

                            <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-6 py-4 whitespace-nowrap transition-colors duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
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

                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white text-sm">
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

import React from 'react';
import headphonesImg from '../../assets/headphones.png';
const SupportCard: React.FC = () => {

    return (
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-xs flex items-center justify-between min-h-[220px]">
            <div className="space-y-4 text-left pr-4">
                <h3 className="text-lg font-bold text-neutral-800">Still need help?</h3>
                <p className="text-xs text-neutral-400 font-normal leading-normal">
                    Our support team is available 24/7
                </p>
                <button
                    type="button"
                    className="mt-2 px-6 py-3 rounded-full bg-primary text-xs font-bold text-white hover:bg-[#0b6646] active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
                >
                    Contact Support
                </button>
            </div>
            <div className="w-[100px] h-[100px] shrink-0 flex items-center justify-center">
                <img
                    src={headphonesImg}
                    alt="Headphones"
                    className="w-full h-full object-contain select-none pointer-events-none"
                />
            </div>
        </div>
    );
};
export default SupportCard;

import React from 'react';

interface HelpCardProps {
  title: string;
  description: string;
}

const HelpCard: React.FC<HelpCardProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col justify-center p-8 bg-white border border-neutral-200 rounded-2xl text-left h-[120px] shadow-xs transition-all duration-200 hover:border-neutral-300">
      <h3 className="text-base font-bold text-neutral-800 mb-1">{title}</h3>
      <p className="text-xs text-neutral-400 font-normal leading-relaxed">{description}</p>
    </div>
  );
};

export default HelpCard;

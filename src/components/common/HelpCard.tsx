interface HelpCardProps {
  title: string;
  description: string;
}

const HelpCard = ({ title, description }: HelpCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default HelpCard;
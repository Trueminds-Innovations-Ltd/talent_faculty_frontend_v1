import React from 'react';

const ARTICLES = [
  { id: 1, title: 'How to submit an assignment' },
  { id: 2, title: 'How to take an assessment' },
  { id: 3, title: 'How to download a certificate' },
  { id: 4, title: 'How to track my progress' },
  { id: 5, title: 'How to change my password' },
];

const ArticleList: React.FC = () => {
  return (
    <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-xs text-left">
      <h3 className="text-lg font-bold text-neutral-800 mb-6">Popular Articles</h3>
      <ul className="space-y-4">
        {ARTICLES.map((article) => (
          <li key={article.id} className="flex items-center gap-3 group cursor-pointer">
            <span className="text-[10px] text-[#0F8A5F] shrink-0 transform scale-y-90">▶</span>
            <span className="text-sm font-medium text-[#0F8A5F] hover:text-[#0b6646] hover:underline transition-colors duration-200">
              {article.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;

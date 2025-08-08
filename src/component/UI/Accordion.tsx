'use client'
import { useState } from 'react';

type AccordionItemType = {
  title: string;
  content?: string;
  children?: AccordionItemType[];
};

type AccordionItemProps = {
  item: AccordionItemType;
};

const AccordionItem = ({ item }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 mx-1">
      <button
        className="w-full flex justify-between items-center py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{item.title}</span>
        {(item.children || item.content) && (
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      {(item.children || item.content) && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out text-gray-700 ${
            isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ willChange: 'max-height, opacity' }}
        >
          <div className="pb-4 pl-4">
            {item.content && <p>{item.content}</p>}
            {item.children && (
              <div className="ml-4 border-l border-gray-300">
                {item.children.map((child, idx) => (
                  <AccordionItem key={idx} item={child} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Accordion() {
  const items: AccordionItemType[] = [
    {
      title: 'BRAND',
      children: [
        { title: 'Nike', content: 'Sports eyewear from Nike.' },
        { title: 'Ray-Ban', content: 'Classic eyewear brand.' },
      ],
    },
    {
      title: 'FRAME SIZE',
      children: [
        { title: 'Small', content: 'Best for narrow faces.' },
        {
          title: 'Medium',
          children: [
            { title: 'Option 1', content: 'Medium frame option 1.' },
            { title: 'Option 2', content: 'Medium frame option 2.' },
          ],
        },
        { title: 'Large', content: 'Best for wide faces.' },
      ],
    },
    { title: 'GENDER', content: 'Men, Women, Unisex.' },
    { title: 'MATERIAL', content: 'Plastic, Metal, Titanium.' },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 divide-y">
      {items.map((item, idx) => (
        <AccordionItem key={idx} item={item} />
      ))}
    </div>
  );
}

'use client'
// components/Accordion.tsx
import { useEffect, useRef, useState } from 'react';

type AccordionItemProps = {
  title: string;
  content: string;
};



const OldAccordionItem = ({ title, content }: AccordionItemProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [maxHeight, setMaxHeight] = useState('0px');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  if (isOpen && contentRef.current) {
    setMaxHeight(`${contentRef.current.scrollHeight}px`);
  } else {
    setMaxHeight('0px');
  }
}, [isOpen]);

  return (
    <div className="border-b-gray-300 mx-1">
      <button
        className="w-full flex justify-between items-center py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
  ref={contentRef}
  className="overflow-hidden transition-all duration-500 ease-in-out text-gray-700"
  style={{ maxHeight }}
>
  <div className="pb-4">{content}</div>
</div>
    </div>
  );
};

export default function Accordion() {
  const items = [
    { title: 'BRAND', content: 'Next.js is a React framework for production.' },
    { title: 'FRAME SIZE', content: 'Tailwind CSS is a utility-first CSS framework.' },
    { title: 'GENDER', content: 'An accordion expands/collapses to show content.' },
    { title: 'MATERIAL', content: 'An accordion expands/collapses to show content.' },
    { title: 'PRESCRIPTION TYPE', content: 'An accordion expands/collapses to show content.' },
    { title: 'SUPPORTED POWER', content: 'An accordion expands/collapses to show content.' },
    { title: 'GLASS COLOR', content: 'An accordion expands/collapses to show content.' },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 divide-y">
      {items.map((item, idx) => (
        <OldAccordionItem key={idx} title={item.title} content={item.content} />
      ))}
    </div>
  );
}



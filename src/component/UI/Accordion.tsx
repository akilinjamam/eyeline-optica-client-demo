/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { AccordionItemType, TAccordion } from '@/ts-definition/types';
import { useState } from 'react';

type AccordionItemProps = {
  item: AccordionItemType;
  selectData?:any
  parentTitle?: string;
  price?:number;
};

const AccordionItem = ({ item, selectData, parentTitle }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const rootTitle = parentTitle || item.title; 

  const handleClick = () => {
    
    if (!item.children || item.children.length === 0) {
     
      if (selectData) {
        selectData({ [String(rootTitle)]: item.title });
      }
      
      
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="border-b border-gray-300 mx-1">
      <button
        className="w-full flex justify-between items-center py-4 text-left"
        onClick={handleClick}
      >
        <span>{item.title}</span>
        {(item.children || item.content) && (
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 cursor-pointer ${
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
            {item.content && <p >{item.content}</p>}
            {item.children && (
              <div className="ml-4 border-l border-gray-300" >
                {item.children.map((child, idx) => (
                  <div
                    key={idx}
                  >
                    <AccordionItem key={idx} item={child} selectData={selectData}  parentTitle={rootTitle} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};




export default function Accordion({item, selectData}: TAccordion) {
  


  return (
    <div className="max-w-xl mx-auto mt-2 divide-y text-black">
      {item.map((item, idx) => (
        <AccordionItem key={idx} item={item} selectData={selectData} parentTitle={item.title}/>
      ))}
    </div>
  );
}

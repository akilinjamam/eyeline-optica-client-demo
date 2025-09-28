/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from "react";
import Accordion from "./Accordion";

import useManageAccordionData from "@/custom-hooks/useManageAccordionData";
import { AccordionItemType, TFrame } from "@/ts-definition/types";

const Sidebar = ({data}:{data:TFrame[]}) => {

  const colors = [...new Set(data?.map((p: TFrame) => p.color))]?.map((color) => {
    return (
      { title: color }
    );
  });

  const brand = [...new Set(data.map((p:TFrame) => p.brand))]?.map((brand) => {
    return (
      {title: brand}
    )
  })
  const frameSize = [...new Set(data.map((p:TFrame) => p.sizeCategory))]?.map((size) => {
    return (
      {title: size}
    )
  })
  const material = [...new Set(data.map((p:TFrame) => p.materialsCategory))]?.map((material) => {
    return (
      {title: material}
    )
  })
  const biology = [...new Set(data.map((p:TFrame) => p.biologyCategory))]?.map((bio) => {
    return (
      {title: bio}
    )
  })

   const items: AccordionItemType[] = [
    {
      title: "BRAND",
      children: brand,
    },
    {
      title: "FRAME SIZE",
      children: frameSize
    },
    { title: "GENDER", children: biology },
    { title: "MATERIAL", children: material },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const accordionItem = items
  const {selectedData, setSelectData} = useManageAccordionData({accordionItem})
  console.log(selectedData)

  

  

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden p-0 m-2  text-blue-400 font-bold absolute top-0 left-0 z-50 cursor-pointer"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {/* Overlay (mobile only) */}
      <div
        className={`fixed inset-0  bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 max-h-[100vh] w-50 bg-blue-50 shadow-lg z-50
          transform transition-transform duration-300 ease-in-out border-r-2 border-gray-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:shadow-none overflow-y-scroll hide-scrollbar
        `}
      >
        <div className="flex justify-between items-center p-4 border-b md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Sidebar content */}
        <p className="font-bold">FRAME COLOR</p>
        <br />
        {
          colors.map((item: any, index: number) => (
            <div className="flex items-center" key={index}>
              <input
                className="mx-1"
                type="radio"
                name="frameColor"   // all radios share the same name
                value={item.title}
                id={`color-${index}`}
                onChange={() => console.log("Selected color:", item.title)}
              />
              <label htmlFor={`color-${index}`} className="mx-1">
                {item.title}
              </label>
            </div>
          ))
        }

        <br />
        <Accordion item={items} selectData={setSelectData} />
      </aside>
    </>
  );
};

export default Sidebar;

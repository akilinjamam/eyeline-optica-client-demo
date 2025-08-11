'use client'
import React, { FC, useState } from "react";
import { frameData } from "./frameData";
import { IFrameData } from "@/ts-definition/interfaces";
import Accordion from "./Accordion";
import { items } from "./productDetail/accordionData";

const Sidebar:FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          frameData.map((item:IFrameData, index:number) => {
            return (
              <div  className="flex items-center" key={index}>
                  <input  className="mx-1" type="checkbox" name="" id="" />
                  <div style={{background:`${item.color}`}} className={`w-[15px] h-[15px] rounded-full  mx-1`}></div>
                  <p className="mx-1">{item.title}</p>
              </div>
            )
          })
        }
        <br />
        <Accordion item={items}/>
      </aside>
    </>
  );
};

export default Sidebar;

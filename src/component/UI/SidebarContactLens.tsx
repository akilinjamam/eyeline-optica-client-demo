/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useManageAccordionData from "@/custom-hooks/useManageAccordionData";
import { AccordionItemType, TContactLens} from "@/ts-definition/types";
import { useSidebar } from "@/context/SidebarContext";

const SidebarContactLens = ({ data }: { data: TContactLens[] }) => {

    const {isSidebarOpen ,setIsSidebarOpen } = useSidebar();
 
  const location = usePathname();
  const defaultType = location?.split('/')?.[location?.split('/')?.length - 1];
 
  const router = useRouter();
  const searchParams = useSearchParams();

  const [getColor, setGetColor] = useState<string>("");

  // local mirror of hook-selected filters (makes UI reactive)
  const [localSelected, setLocalSelected] = useState<Record<string, string>>({});

  const brand = [...new Set(data.map((p: TContactLens) => p.brand))]?.map((brand) => ({
    title: brand,
  }));
  const contactLensType = [...new Set(data.map((p: TContactLens) => p.type))]?.map(
    (size) => ({ title: size })
  );
  const material = [
    ...new Set(data.map((p: TContactLens) => p.material)),
  ]?.map((material) => ({ title: material }));
  

  const items: AccordionItemType[] = [
    { title: "BRAND", children: brand },
    { title: "TYPE", children: contactLensType },
    { title: "MATERIAL", children: material },
  ];

  
  const accordionItem = items;
  const { selectedData, setSelectData, setSelectedData } = useManageAccordionData({
    accordionItem,
  });

  // Initialize localSelected + getColor from current URL on mount / when searchParams changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const init: Record<string, string> = {};
    for (const [k, v] of params.entries()) {
      if (k === "color") {
        setGetColor(v);
      } else {
        init[k] = v;
      }
    }
    setLocalSelected(init);
    // try to sync hook with URL (safe-guard in case hook expects initialization)
    try {
      setSelectData(init as any);
    } catch (err) {
      console.log(err)
      // ignore if hook API differs
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Keep localSelected in sync with hook selectedData (hook -> local)
  useEffect(() => {
    setLocalSelected(selectedData ?? {});
  }, [selectedData]);

  // When localSelected or color changes, update the URL (server page will re-fetch)
  useEffect(() => {
    const params = new URLSearchParams();
  

    if (getColor) params.set("color", getColor);

    Object.entries(localSelected).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    // push new query string
    router.push(`?${params.toString()}`);
  }, [localSelected, getColor, router,defaultType]);

  // Delete single filter (works for color and any other filter)
  const handleDelete = (key: string) => {
    if (key === "color") {
      // remove color
      setGetColor("");
      // update URL is handled by the effect (depends on getColor/localSelected)
    } else {
      // remove from local copy
      const newLocal = { ...localSelected };
      delete newLocal[key];
      setLocalSelected(newLocal);

      // try to update the hook's state too (best-effort)
      try {
        setSelectData(newLocal as any);
        setSelectedData(newLocal as any);
      } catch (err) {
        console.log(err)
        // if hook expects different API, ignore (URL + localSelected will still remove filter)
      }
    }
  };

  // Clear all filters (reset everything)
  const clearAllFilters = () => {
    setGetColor("");
    setLocalSelected({});
    try {
      setSelectData({} as any);
      setSelectedData({})
    } catch (err:any) {
      // ignore if hook API differs
      console.log(err)
    }
   
  };

  return (
    <>
  {/* Mobile hamburger button */}
  <button
    className="md:hidden p-0 m-1 text-blue-600 font-bold absolute top-0 left-3 z-50 cursor-pointer text-2xl"
    onClick={() => setIsSidebarOpen(true)}
    aria-label="Open sidebar"
  >
    ☰
  </button>

  {/* Overlay (mobile only) */}
  <div
    className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${
      isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
    } md:hidden`}
    onClick={() => setIsSidebarOpen(false)}
  ></div>

  {/* Sidebar */}
  <aside
    className={`
      fixed top-0 left-0 h-full w-64 
      bg-blue-50  shadow-2xl border-r border-gray-200
      z-50 p-4 overflow-y-auto hide-scrollbar

      transform transition-all duration-300 ease-in-out
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 md:static md:shadow-none
    `}
  >

    {/* Sticky Header (Mobile Only) */}
    <div className="sticky top-0 bg-[#f0f7ff] pb-3 z-20 border-b mb-4 flex justify-between items-center md:hidden">
      <h2 className="text-xl font-bold text-black">Menu</h2>
      <button
        onClick={() => setIsSidebarOpen(false)}
        aria-label="Close sidebar"
        className="text-gray-500 text-xl hover:text-gray-800"
      >
        ✕
      </button>
    </div>

    {/* Contact Lens Color */}
    <p className="font-bold text-gray-700 text-sm tracking-wide">CONTACT LENS COLOR</p>

    <div className="mt-3 space-y-2">
      {data
        .map((p) => p.color)
        .filter((c, i, arr) => arr.indexOf(c) === i)
        .map((color, idx) => (
          <label
            key={idx}
            className="flex items-center gap-3 p-2 bg-white rounded-md border border-gray-200 
            hover:bg-blue-100 cursor-pointer transition"
          >
            <input
              type="radio"
              name="frameColor"
              value={color}
              checked={getColor === color}
              onChange={() => setGetColor(color as string)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-300 cursor-pointer"
            />
            <span className="text-gray-700 text-sm">{color}</span>
          </label>
        ))}
    </div>

    <div className="my-4 border-t"></div>

    {/* Accordion Filter Section */}
    <Accordion item={items} selectData={setSelectData} />

    {/* Active Filters */}
    <div className="mt-6">
      <p className="font-bold text-gray-700 text-sm tracking-wide mb-2">
        ACTIVE FILTERS
      </p>

      <div className="flex flex-wrap gap-2">

        {/* Color Tag */}
        {getColor && (
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs flex items-center gap-2 shadow-sm">
            <span>{getColor}</span>
            <button
              onClick={() => handleDelete("color")}
              className="text-red-500 text-sm font-bold"
            >
              ✕
            </button>
          </span>
        )}

        {/* Other Tags */}
        {Object.entries(localSelected).map(([key, value]) =>
          value ? (
            <span
              key={key}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs flex items-center gap-2 shadow-sm"
            >
              <span>{value}</span>
              <button
                onClick={() => handleDelete(key)}
                className="text-red-500 font-bold text-sm"
              >
                ✕
              </button>
            </span>
          ) : null
        )}
      </div>

      {/* Clear All */}
      {(getColor || Object.keys(localSelected).some((k) => localSelected[k])) && (
        <button
          onClick={clearAllFilters}
          className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-red-600 transition"
        >
          Clear All Filters
        </button>
      )}
    </div>
  </aside>
</>

  );
};

export default SidebarContactLens;

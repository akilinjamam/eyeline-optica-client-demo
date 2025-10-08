/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useManageAccordionData from "@/custom-hooks/useManageAccordionData";
import { AccordionItemType, TFrame } from "@/ts-definition/types";

const SidebarOld = ({ data }: { data: TFrame[] }) => {
  const [dataAcordingToPath, setDataAccordingToPath] = useState<TFrame[]>([])
  const location = usePathname();
  const defaultType = location?.split('/')?.[location?.split('/')?.length - 1];
  console.log(defaultType)

  useEffect(() => {
    if(location === "/allglasses"){
      const result = data?.filter((item:TFrame) => item?.type === 'eye glasses');
      setDataAccordingToPath(result)
    }
    if(location ===  '/allglasses/sunglasses'){
      const result = data?.filter((item:TFrame) => item?.type === 'sunglasses');
      setDataAccordingToPath(result)
    }
    if(location ===  '/allglasses/brand'){
      setDataAccordingToPath(data)
    }
  },[location, data])
  

  const router = useRouter();
  const searchParams = useSearchParams();

  const [getColor, setGetColor] = useState<string>("");

  // local mirror of hook-selected filters (makes UI reactive)
  const [localSelected, setLocalSelected] = useState<Record<string, string>>({});

  const brand = [...new Set(dataAcordingToPath.map((p: TFrame) => p.brand))]?.map((brand) => ({
    title: brand,
  }));
  const frameSize = [...new Set(dataAcordingToPath.map((p: TFrame) => p.sizeCategory))]?.map(
    (size) => ({ title: size })
  );
  const material = [
    ...new Set(dataAcordingToPath.map((p: TFrame) => p.materialsCategory)),
  ]?.map((material) => ({ title: material }));
  const biology = [...new Set(dataAcordingToPath.map((p: TFrame) => p.biologyCategory))]?.map(
    (bio) => ({ title: bio })
  );

  const items: AccordionItemType[] = [
    { title: "BRAND", children: brand },
    { title: "SIZE-CATEGORY", children: frameSize },
    { title: "BIOLOGY-CATEGORY", children: biology },
    { title: "MATERIALS-CATEGORY", children: material },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const accordionItem = items;
  const { selectedData, setSelectData, setSelectedData } = useManageAccordionData({
    accordionItem,
  });

  // Initialize localSelected + getColor from current URL on mount / when searchParams changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const init: Record<string, string> = {};
    for (const [k, v] of params.entries()) {
      if (k === "type") continue;
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
    // effect will push ?type=eye glasses automatically because localSelected & getColor changed
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden p-0 m-2 text-blue-400 font-bold absolute top-0 left-0 z-50 cursor-pointer"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {/* Overlay (mobile only) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-[100vh] w-60 p-2 bg-blue-50 shadow-lg z-50
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
        {dataAcordingToPath
          .map((p) => p.color)
          .filter((c, i, arr) => arr.indexOf(c) === i)
          .map((color, idx) => (
            <div key={idx} className="flex items-center">
              <input
                type="radio"
                name="frameColor"
                value={color}
                checked={getColor === color}
                onChange={() => setGetColor(color as string)}
              />
              <label className="ml-2">{color}</label>
            </div>
          ))}
        <br />

        <Accordion item={items} selectData={setSelectData} />

        {/* Selected Filters */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mt-2">
          <p className="font-bold">Active Filters:</p>
            {/* Frame Color */}
            <br />
            {getColor && (
              <span className="bg-blue-200 px-2 py-1 rounded flex items-center gap-2">
                <span>{getColor}</span>
                <button
                  onClick={() => handleDelete("color")}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            )}

            {/* Other filters (from localSelected) */}
            {Object.entries(localSelected).map(([key, value]) => {
              if (!value) return null;
              return (
                <span
                  key={key}
                  className="bg-blue-200 px-2 py-1 rounded flex items-center gap-2"
                >
                  <span>
                    {value}
                  </span>
                  <button
                    onClick={() => handleDelete(key)}
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </span>
              );
            })}
          </div>

          {/* Clear All Button */}
          {(getColor || Object.keys(localSelected).some((k) => !!localSelected[k])) && (
            <button
              onClick={clearAllFilters}
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded"
            >
              Clear All
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default SidebarOld;

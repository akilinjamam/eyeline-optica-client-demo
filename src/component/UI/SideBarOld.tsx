/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useManageAccordionData from "@/custom-hooks/useManageAccordionData";
import { AccordionItemType, TFrame } from "@/ts-definition/types";
import rectangle from '../../../public/frameShapeImg/frame-ractangular.png'
import round from '../../../public/frameShapeImg/frame-round.png'
import catseye from '../../../public/frameShapeImg/frame-catseye.png'
import aviator from '../../../public/frameShapeImg/aviator.png'
import hexagonal from '../../../public/frameShapeImg/hexagonal.png'
import panthos from '../../../public/frameShapeImg/panthos.png'
import man from '../../../public/frameGenderImg/man.png'
import women from '../../../public/frameGenderImg/women.png'
import kids from '../../../public/frameGenderImg/kids.png'
import all from '../../../public/frameShapeImg/all.png'
import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";

const SidebarOld = ({ data }: { data: TFrame[] }) => {
  
  const [dataAcordingToPath, setDataAccordingToPath] = useState<TFrame[]>([]);
  // const [shapeCategory, setShapeCategory] = useState([])
  const location = usePathname();
  const defaultType = location?.split('/')?.[location?.split('/')?.length - 1];
 

  useEffect(() => {
    if(location === "/allglasses"){
      const result = data?.filter((item:TFrame) => item?.type === 'eye glasses');
      setDataAccordingToPath(result)
    }
    if(location ===  '/allglasses/sunglasses'){
      const result = data?.filter((item:TFrame) => item?.type === 'sunglasses');
      setDataAccordingToPath(result)
    }
    if(location ===  '/allglasses/brand' || location ===  '/allglasses/bestSelling'){
      setDataAccordingToPath(data)
    }    
    if(location ===  '/allglasses/mensGlasses' || location ===  '/allglasses/womensGlasses' || location ===  '/allglasses/kidsGlasses'){
      const result = data?.filter((item:TFrame) => item?.biologyCategory === 'men' || item?.biologyCategory === 'women' || item?.biologyCategory === 'kids');
      setDataAccordingToPath(result)
    }    
    if(location ===  '/allglasses/womensGlasses'){
      const result = data?.filter((item:TFrame) => item?.biologyCategory === 'women' );
      setDataAccordingToPath(result)
    }    
    if( location ===  '/allglasses/kidsGlasses'){
      const result = data?.filter((item:TFrame) =>  item?.biologyCategory === 'kids');
      setDataAccordingToPath(result)
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

  const allShapeCategory = dataAcordingToPath?.map((shape:TFrame) => shape.shapeCategory);
  const allGenderCategory = dataAcordingToPath?.map((shape:TFrame) => shape.biologyCategory);

  const frameShapeCategory = [...new Set(allShapeCategory?.map((shape:any) => shape))]
  const genderCategory = [...new Set(allGenderCategory?.map((gender:any) => gender))]
  
  const isShapeAvaiable = (value:string) => {
    const findShape = ["all",...frameShapeCategory]?.find((shape:string) => shape === value);

    return findShape ? findShape : 'none'
  }
  const isGenderAvaiable = (value:string) => {
    const findGender = ["all",...genderCategory]?.find((gender:string) => gender === value);

    return findGender ? findGender : 'none'
  }

  const frameShapeItems = [
    {
      name:"all",
      img: all,
      isAvailable: isShapeAvaiable("all")
    },
    {
      name:"rectangle",
      img: rectangle,
      isAvailable: isShapeAvaiable("rectangle")
    },
    {
      name:"round",
      img: round,
      isAvailable: isShapeAvaiable("round")
    },
    {
      name:"cats eye",
      img: catseye,
      isAvailable: isShapeAvaiable("cats eye")
    },
    {
      name:"avietor",
      img:aviator,
      isAvailable: isShapeAvaiable("avietor")
    },
    {
      name:"hexagonal",
      img: hexagonal,
      isAvailable: isShapeAvaiable("hexagonal")
    },
    {
      name:"panthos",
      img: panthos,
      isAvailable: isShapeAvaiable("panthos")
    },
  ]
  const genderItems = [
    {
      name:"all",
      img: all,
      isAvailable: isGenderAvaiable("all")
    },
    {
      name:"men",
      img: man,
      isAvailable: isGenderAvaiable("men")
    },
    {
      name:"women",
      img: women,
      isAvailable: isGenderAvaiable("women")
    },
    {
      name:"kids",
      img: kids,
      isAvailable: isGenderAvaiable("kids")
    }
  ]

  const items: AccordionItemType[] = [
    { title: "BRAND", children: brand },
    { title: "SIZE-CATEGORY", children: frameSize },
    { title: "MATERIALS-CATEGORY", children: material },
  ];

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
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
    console.log(Array.from(searchParams.keys())?.join(''))
    
    if(Array.from(searchParams.keys())?.join('') === "shapeCategory") return
    if(Array.from(searchParams.keys())?.join('') === "biologyCategorytype") return
    if(Array.from(searchParams.keys())?.join('') === "type") return

    // push new query string
    router.push(`?${params.toString()}`);
  }, [localSelected, getColor, router,defaultType, searchParams]);

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

  const handleShape = (value: string) => {
  const params = new URLSearchParams(searchParams?.toString() ?? "");

  if (value === "all") {
    params.delete("shapeCategory");
  } else {
    params.set("shapeCategory", value);
  }

  router.push(`?${params.toString()}`);
};
  const handleGender = (value: string) => {
  const params = new URLSearchParams(searchParams?.toString() ?? "");

  if (value === "all") {
    params.delete("biologyCategory");
  } else {
    params.set("biologyCategory", value);
  }

  router.push(`?${params.toString()}`);
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
          fixed top-0 left-0 h-[100vh] sm:w-[80%] md:w-[60%] lg:w-[25%]   p-2 bg-blue-50 shadow-lg z-50
          transform transition-transform duration-300 ease-in-out border-r-2 border-gray-200
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:shadow-none overflow-y-scroll hide-scrollbar
        `}
      >
        <div className="flex justify-between items-center p-4 border-b md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Sidebar content */}
        <p className="font-bold text-black">GENDER</p>
        <div className="w-full grid grid-cols-3 gap-2">
        {genderItems?.map((shape: any, index: number) => (
          <div
            key={index}
            className={`bg-white border h-[80px] border-gray-400 p-2 flex justify-center items-center text-center text-black ${
              shape.isAvailable === 'none' ? 'opacity-0' : ''
            }`}
          >
          {shape.isAvailable !== 'none' 
          ? 
          <div onClick={() =>handleGender(shape?.name)} className="cursor-pointer">
            <Image width={50} src={shape?.img} alt={`frame-shape-${index}`} /> 
            <p className="text-xs">{shape?.name}</p>           
          </div> : 'N/A'}
        </div>
      ))}

        {/* Ensure 3 columns always */}
        {Array.from({ length: (3 - (frameShapeItems?.length % 3 || 3)) % 3 }).map((_, i) => (
          <div key={`empty-${i}`} className="invisible">
            filler
          </div>
        ))}
        <br />
        </div>
        <p className="font-bold text-black">FRAME SHAPE</p>
        <div className="w-full grid grid-cols-3 gap-2 text-black">
        {frameShapeItems?.map((shape: any, index: number) => (
          <div
            key={index}
            className={`bg-white border h-[80px] border-gray-400 p-2 flex justify-center items-center text-center ${
              shape.isAvailable === 'none' ? 'hidden' : ''
            }`}
          >
          {shape.isAvailable !== 'none' 
          ? 
          <div onClick={() =>handleShape(shape?.name)} className="cursor-pointer">
            <Image width={50} src={shape?.img} alt={`frame-shape-${index}`} /> 
            <p className="text-xs">{shape?.name}</p>           
          </div> : 'N/A'}
        </div>
      ))}

        {/* Ensure 3 columns always */}
        {Array.from({ length: (3 - (frameShapeItems?.length % 3 || 3)) % 3 }).map((_, i) => (
          <div key={`empty-${i}`} className="invisible">
            filler
          </div>
        ))}
        </div>
        <div>

  {/* Selected Filters */}
        <div className="mt-1">
          <div className="flex flex-wrap mr-2 mt-1">
          {/* <p className="font-bold">Active Filters:</p> */}
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
  <p className="font-semibold text-gray-700 text-sm tracking-wide mb-2 border-b pb-1">
    FRAME COLOR
  </p>

  <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2">
    {dataAcordingToPath
      .map((p) => p.color)
      .filter((c, i, arr) => arr.indexOf(c) === i)
      .map((color, idx) => {
        const selectedColors = getColor ? getColor.split(",") : [];
        const isChecked = selectedColors.includes(color as string);

        return (
          <label
            key={idx}
            className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer transition-all duration-200 hover:shadow-sm ${
              isChecked ? "bg-blue-100 border-blue-400" : "bg-white border-gray-200"
            }`}
          >
            <input
              type="checkbox"
              value={color}
              checked={isChecked}
              onChange={() => {
                setGetColor(color as string);
              }}
              className="accent-blue-500 cursor-pointer"
            />
            <span
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: color }}
            ></span>
            <span title={color} className="capitalize text-xs text-gray-700">{ (color && color?.length > 7) ? `${color?.slice(0,7)}..` : `${color}`}</span>
          </label>
        );
      })}
  </div>
</div>
        <br />

        <Accordion item={items} selectData={setSelectData} />
        {/* Selected Filters */}
        <div className="mt-1 text-black">
          <div className="flex flex-wrap mr-2 mt-2">
          {/* <p className="font-bold">Active Filters:</p> */}
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
              className="mt-1 px-3 py-1 bg-red-500 text-white rounded"
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

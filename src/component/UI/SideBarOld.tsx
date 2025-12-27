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
  const { selectedData, setSelectData, } = useManageAccordionData({
    accordionItem,
  });

  
  useEffect(() => {
    setLocalSelected(selectedData ?? {});
  }, [selectedData]);

  
  const handleDelete = (key: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
   if(key === "color"){
      params.delete("color");
      setGetColor("");
   }else{
      params.delete(key);
      setLocalSelected({});
   }
  
   router.push(`?${params.toString()}`);
  };

  
  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");

     if(getColor) {
      params.delete("color")
      setGetColor("");
    }

    if(Object.keys(localSelected).length > 0){
      for(const item of Object.keys(localSelected)){
      params.delete(item)
    }
    setLocalSelected({})
    }
    
    router.push(`?${params.toString()}`);
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

  const handleColor = (value:string) => {
    setGetColor(value)
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("color", value);
    router.push(`?${params.toString()}`);
  }

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
        <p className="font-bold text-black mb-2">GENDER</p>
        <div className="w-full grid grid-cols-3 gap-2">
        {genderItems?.map((shape: any, index: number) => (
          <div
            key={index}
            className={`bg-white border h-[90px] border-gray-400 p-2 flex justify-center items-center text-center ${
              shape.isAvailable === 'none' ? 'opacity-0' : ''
            }`}
          >
          {shape.isAvailable !== 'none' 
          ? 
          <div onClick={() =>handleGender(shape?.name)} className="cursor-pointer w-[100%] py-2">
            <Image width={50} height={50} src={shape?.img} alt={`frame-shape-${index}`} className={`${shape?.name === "all" ? "w-[50px]" : "w-[70px]"} mx-auto`}/> 
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
            className={`bg-white border h-[90px] border-gray-400 p-2 flex justify-center items-center text-center ${
              shape.isAvailable === 'none' ? 'hidden' : ''
            }`}
          >
          {shape.isAvailable !== 'none' 
          ? 
          <div onClick={() =>handleShape(shape?.name)} className="cursor-pointer">
            <Image width={50} src={shape?.img} alt={`frame-shape-${index}`} className={`${shape?.name === "all" ? "w-[50px]" : "w-[60px]"}`}/> 
            <p className={`text-xs`}>{shape?.name}</p>           
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
            {/* {getColor && (
              <span className="bg-blue-200 px-2 py-1 rounded flex items-center gap-2">
                <span>{getColor}</span>
                <button
                  onClick={() => handleDelete("color")}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            )} */}

            {/* Other filters (from localSelected) */}
            {/* {Object.entries(localSelected).map(([key, value]) => {
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
            })} */}
          </div>

          {/* Clear All Button */}
          {(getColor || Object.keys(localSelected).some((k) => !!localSelected[k])) && (
            <button
              onClick={clearAllFilters}
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded"
            >
              Clear
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
              onChange={() => handleColor(color as string)}
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
            {/* {Object.entries(localSelected).map(([key, value]) => {
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
            })} */}
          </div>

          {/* Clear All Button */}
          {(getColor || Object.keys(localSelected).some((k) => !!localSelected[k])) && (
            <button
              onClick={clearAllFilters}
              className="mt-1 px-3 py-1 bg-red-500 text-white rounded"
            >
              Clear
            </button>
          )}
        </div>
        
      </aside>
    </>
  );
};

export default SidebarOld;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { GlassCardProps } from "@/ts-definition/interfaces";
import { AccordionItemType } from "@/ts-definition/types";
import { useEffect, useState } from "react";

interface IUseMangeAccordion {
  accordionItem: AccordionItemType[];
  product?: GlassCardProps;
}

const useManageAccordionData = ({
  accordionItem,
  product,
}: IUseMangeAccordion) => {
  const [selectData, setSelectData] = useState<{
    price?: number;
    [key: string]: any;
  }>({});
  const [selectPrice, setSelectPrice] = useState<{
    price?: number;
    [key: string]: any;
  }>({});
  const [selectedData, setSelectedData] = useState<{ [key: string]: any }>({});
  const [selectedPrice, setSelectedPrice] = useState<{ [key: string]: any }>(
    {}
  );
  const [combineValue, setCombineValue] = useState<string[]>([]);

  // --- Update selectedData safely ---
  useEffect(() => {
    const allTypes = accordionItem.map((item) => item.title);
    const key = Object.keys(selectData)[0];

    if (key && allTypes.includes(key)) {
      setSelectedData((prev) => {
        if (prev[key] === selectData[key]) return prev; // no change, skip update
        return { ...prev, ...selectData };
      });
    }
  }, [selectData, accordionItem]);

  // --- Update selectedPrice safely ---
  useEffect(() => {
    if (selectData.price !== undefined) {
      setSelectedPrice((prev) => {
        const updated = { ...prev, ...selectPrice };
        // shallow equality check to prevent unnecessary re-renders
        const isSame =
          Object.keys(updated).length === Object.keys(prev).length &&
          Object.keys(updated).every((key) => updated[key] === prev[key]);

        return isSame ? prev : updated;
      });
    }
  }, [selectData, selectPrice]);

  // --- Combine data and prices ---
  useEffect(() => {
    const titleArray: string[] = [];
    const priceArray: string[] = [];
    const combineArray: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { price, ...propertiesWithoutPrice } = selectedData;

    for (const key in propertiesWithoutPrice) {
      titleArray.push(`${key}: ${propertiesWithoutPrice[key]}`);
    }

    for (const key in selectedPrice) {
      if (key !== "price") {
        priceArray.push(`${key}: ${selectedPrice[key]}`);
      }
    }

    if (titleArray.length === 0 || priceArray.length === 0) return;

    for (let i = 0; i < titleArray.length; i++) {
      const [key1, value1] = titleArray[i]?.split(": ");
      const [key2, value2] = priceArray[i]?.split(": ");

      if (key1 && value1 && key2 && value2 && key1 === key2) {
        combineArray.push(`${key1}: ${value1}/${value2}`);
      } else {
        console.warn(
          `Mismatch or missing data at index ${i}. titleArray: "${titleArray[i]}", priceArray: "${priceArray[i]}"`
        );
      }
    }

    setCombineValue(combineArray);
  }, [selectedData, selectedPrice]);

  // --- Calculate total price ---
  const basePrice = product?.price ?? 0;

  const totalPrice: number[] = product
    ? [
        basePrice,
        ...combineValue.map((item) => Number(item?.split("/")?.[1]) || 0),
      ]
    : [];

  return {
    selectData,
    setSelectData,
    selectedData,
    setSelectedData,
    selectPrice,
    setSelectPrice,
    selectedPrice,
    setSelectedPrice,
    combineValue,
    setCombineValue,
    totalPrice,
  };
};

export default useManageAccordionData;

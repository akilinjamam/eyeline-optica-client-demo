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

  // console.log(selectData);
  // console.log(selectPrice);

  useEffect(() => {
    const allTypes = accordionItem.map((item) => item.title);
    if (allTypes.includes(Object.keys(selectData)[0])) {
      setSelectedData((prev) => ({ ...prev, ...selectData }));
    }
  }, [selectData, accordionItem]);

  useEffect(() => {
    if (selectData.price && selectData.price) {
      setSelectedPrice((prev) => ({ ...prev, ...selectPrice }));
    }
  }, [selectData, selectPrice]);

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
    // console.log("Combined Array:", combineArray);
    setCombineValue(combineArray);
  }, [selectedData, selectedPrice]);

  const basePrice = product?.price ?? 0;

  let totalPrice: number[] = [];

  if (product) {
    totalPrice = [
      basePrice,
      ...combineValue?.map((item: any) => Number(item?.split("/")?.[1])),
    ];
  } else {
    totalPrice = [];
  }

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

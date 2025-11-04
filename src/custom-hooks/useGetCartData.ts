/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cart } from "@/app/cart/page";
import { TDataWithoutMeta } from "@/ts-definition/types";
import { useEffect, useState } from "react";

const useGetCartData = (phone: any, id: string) => {
  const [cartData, setCartData] = useState<TDataWithoutMeta<Cart>>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/get-cart-by-id/${phone}`
        );
        const json = await result.json();
        if (json.success) {
          const findSingleCartWithId = json?.data?.find(
            (item: Cart) => item._id === id
          );
          setLoading(false);
          setCartData(findSingleCartWithId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [phone, id]);
  const cart = cartData;

  return { cart, loading };
};

export default useGetCartData;

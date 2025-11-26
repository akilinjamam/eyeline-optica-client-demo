import { toast } from "react-toastify";

export const handleWishList = async (value: Record<string, unknown>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}wishlist/create-wishlist`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      }
    );

    const resData = await res.json();
    console.log(resData);
    if (resData?.success) toast.success("Added to Wishlist");
  } catch (error) {
    console.log(error);
  }
};

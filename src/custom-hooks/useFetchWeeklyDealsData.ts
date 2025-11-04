import { TDataWithoutMeta, TWeeklyDeals } from "@/ts-definition/types";
import { useEffect, useState } from "react";

const useFetchWeeklyDealsData = () => {
  const [weeklyDealsData, setWeeklyDealsData] = useState<
    TDataWithoutMeta<TWeeklyDeals>
  >({
    success: false,
    statusCode: 0,
    message: "",
    data: {
      startDate: "",
      endDate: "",
      active: false,
      discountPercent: 0,
      title: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}search/get-deals`
        );
        const json = await result.json();
        if (json.success) {
          setLoading(false);
          setWeeklyDealsData(json);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const dealsData = weeklyDealsData?.data;

  return { dealsData, loading };
};

export default useFetchWeeklyDealsData;

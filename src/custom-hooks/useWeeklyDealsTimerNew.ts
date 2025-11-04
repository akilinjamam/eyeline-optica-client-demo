import { TTimes } from "@/ts-definition/types";
import { useEffect, useState } from "react";

interface IUseWeeklyDealTimerProps {
  startDate: string; // ISO string from API
  endDate: string; // ISO string from API
}

const useWeeklyDealTimerNew = ({
  startDate,
  endDate,
}: IUseWeeklyDealTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TTimes>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Convert API dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    const handleTimer = () => {
      const now = new Date();

      // Deal hasn't started yet
      if (now < start) {
        const remainingTime = start.getTime() - now.getTime();
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        return;
      }

      // Deal is active
      if (now >= start && now <= end) {
        const remainingTime = end.getTime() - now.getTime();
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        return;
      }

      // Deal ended
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    };

    const timer = setInterval(handleTimer, 1000);
    handleTimer(); // run immediately on mount

    return () => clearInterval(timer);
  }, [startDate, endDate]);
  return { timeLeft };
};

export default useWeeklyDealTimerNew;

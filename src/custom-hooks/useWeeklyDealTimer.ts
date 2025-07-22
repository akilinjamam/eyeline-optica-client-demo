import { TTimes } from "@/ts-definition/types";
import { useEffect, useMemo, useState } from "react";

const useWeeklyDealTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TTimes>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ✅ Memoize the deadline so it doesn't change every render
  const deadlines = useMemo(() => {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  }, []);

  useEffect(() => {
    const handleTimer = () => {
      const now = new Date();
      const remainingTime = deadlines.getTime() - now.getTime();

      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });

      if (remainingTime <= 0) clearInterval(timer);
    };

    const timer = setInterval(handleTimer, 1000);

    return () => clearInterval(timer);
  }, [deadlines]);

  return { timeLeft, setTimeLeft, deadlines };
};

export default useWeeklyDealTimer;

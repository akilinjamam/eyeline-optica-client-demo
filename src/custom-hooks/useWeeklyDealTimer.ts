import { TTimes } from "@/ts-definition/types";
import { useEffect, useState } from "react";

const useWeeklyDealTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TTimes>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const deadlines = (() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("weekly-deal-deadline");
      if (saved) return new Date(saved);

      const newDeadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      localStorage.setItem("weekly-deal-deadline", newDeadline.toISOString());
      return newDeadline;
    }
    return new Date(); // fallback in SSR
  })();

  useEffect(() => {
    const handleTimer = () => {
      const now = new Date();
      const remainingTime = deadlines.getTime() - now.getTime();

      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds, days });

      if (remainingTime <= 0) clearInterval(timer);
    };

    const timer = setInterval(handleTimer, 1000);

    return () => clearInterval(timer);
  }, [deadlines]);

  return { timeLeft, setTimeLeft, deadlines };
};

export default useWeeklyDealTimer;

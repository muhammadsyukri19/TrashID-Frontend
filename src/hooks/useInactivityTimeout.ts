import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Timeout set to 15 minutes in milliseconds
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; 

export function useInactivityTimeout() {
  const router = useRouter();
  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    // 1. Function to check if the user is inactive
    const checkInactivity = () => {
      const token = localStorage.getItem("token");
      if (!token) return false;

      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity) {
        const elapsed = Date.now() - parseInt(lastActivity, 10);
        if (elapsed > INACTIVITY_TIMEOUT) {
          // Clear authentication items and activity tracker
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("lastActivity");
          
          // Redirect directly to landing page
          router.push("/");
          return true;
        }
      } else {
        // Initialize lastActivity if token exists but timestamp is not yet set
        localStorage.setItem("lastActivity", Date.now().toString());
      }
      return false;
    };

    // Perform initial check on mount
    const isInactive = checkInactivity();
    if (isInactive) return;

    // 2. Track activity to update the timestamp
    const updateActivity = () => {
      const now = Date.now();
      // Throttle localStorage writes to every 5 seconds for optimal performance
      if (now - lastUpdateRef.current > 5000) {
        localStorage.setItem("lastActivity", now.toString());
        lastUpdateRef.current = now;
      }
    };

    // Events to monitor user activity
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, updateActivity, { passive: true });
    });

    // 3. Set up interval to actively monitor inactivity if the tab is left open
    const intervalId = setInterval(() => {
      checkInactivity();
    }, 10000); // Check every 10 seconds

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(intervalId);
    };
  }, [router]);
}

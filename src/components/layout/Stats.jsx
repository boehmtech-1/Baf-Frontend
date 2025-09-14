import React, { useState, useEffect, useRef } from "react";

// CounterUp component with smoother easing
const CounterUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerAnimation(true);
        } else {
          setTriggerAnimation(false);
          setCount(0); // reset for reanimation
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = counterRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!triggerAnimation) return;

    let animationFrameId;
    const startTime = performance.now();

    const updateCounter = (now) => {
      const elapsedTime = now - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Smooth easing (easeOutCubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(end * easeOutCubic);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrameId);
  }, [triggerAnimation, end, duration]);

  return <span ref={counterRef}>{count.toLocaleString()}</span>;
};

// Main Achievements Section
const AchievementsSection = () => {
  const [progressData, setProgressData] = useState({
    design_projects_completed: 0,
    client_satisfaction_rate: 0,
    years_of_experience: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // Use the same pattern as your working collections
        const response = await fetch('/api/progress?limit=1');

        if (!response.ok) {
          throw new Error('Failed to fetch progress data');
        }

        const data = await response.json();
        console.log('Progress API Response:', data);

        if (data.docs && data.docs.length > 0) {
          const progressDoc = data.docs[0];
          setProgressData({
            design_projects_completed: progressDoc.design_projects_completed || 0,
            client_satisfaction_rate: progressDoc.client_satisfaction_rate || 0,
            years_of_experience: progressDoc.years_of_experience || 0,
          });
        } else {
          throw new Error('No progress data found');
        }
      } catch (error) {
        console.error('Error fetching progress data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-black flex justify-center pt-12 pb-8 px-4 sm:px-6 md:px-8">
        <div className="bg-[#0b0b0b] rounded-2xl w-full max-w-6xl mx-auto p-8">
          <div className="flex justify-center items-center h-32">
            <div className="text-gray-400">Loading statistics...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-black flex justify-center pt-12 pb-8 px-4 sm:px-6 md:px-8">
        <div className="bg-[#0b0b0b] rounded-2xl w-full max-w-6xl mx-auto p-8">
          <div className="flex justify-center items-center h-32">
            <div className="text-red-400">Error loading statistics: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black flex justify-center pt-12 pb-8 px-4 sm:px-6 md:px-8">
      <div className="bg-[#0b0b0b] rounded-2xl w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-around text-center p-8 sm:p-10 space-y-8 md:space-y-0">
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center w-full p-4">
            <div className="text-5xl sm:text-6xl font-light text-white mb-2 tracking-tight font-[Poppins]">
              <CounterUp end={progressData.design_projects_completed} />
            </div>
            <p className="text-sm sm:text-base text-gray-300 font-normal font-[Poppins]">
              Design projects completed
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[2px] h-28 bg-white/20"></div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center w-full p-4">
            <div className="text-5xl sm:text-6xl font-light text-white mb-2 tracking-tight font-[Poppins]">
              <CounterUp end={progressData.client_satisfaction_rate} />
            </div>
            <p className="text-sm sm:text-base text-gray-300 font-normal font-[Poppins]">
              Client satisfaction rate
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[2px] h-28 bg-white/20"></div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center w-full p-4">
            <div className="text-5xl sm:text-6xl font-light text-white mb-2 tracking-tight font-[Poppins]">
              <CounterUp end={progressData.years_of_experience} />
            </div>
            <p className="text-sm sm:text-base text-gray-300 font-normal font-[Poppins]">
              Years of experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;
import React, { useState, useEffect, useRef } from 'react';

// The CounterUp component with updated animation logic for a smoother start.
const CounterUp = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId;
    const startTime = Date.now();

    const updateCounter = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Using an ease-out function for a smooth deceleration effect
      const easeOutQuint = 1 - Math.pow(1 - progress, 5);
      const currentCount = Math.round(end * easeOutQuint);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(end); // Ensure it finishes on the exact end value
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  // The ref is now on the span to directly observe the number
  return (
    <span ref={counterRef}>
      {count.toLocaleString()}
    </span>
  );
};

// The main component with updated structure and styling
const AchievementsSection = () => {
  // Mock data to replicate the screenshot's values
  const mockData = {
    home: {
      design_projects_completed: 180,
      client_satisfaction_rate: 96,
      years_of_experience: 15,
    }
  };

  return (
    <div className="bg-black flex justify-center py-24 px-4 sm:px-6 md:px-8">
      
      <div className="bg-[#0d0d0d] rounded-2xl w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-around text-center p-8 sm:p-12">

          {/* Stat 1: Design Projects */}
          <div className="flex flex-col items-center justify-center w-full p-4">
            <div className="text-5xl sm:text-6xl font-semibold text-white mb-2 tracking-tight">
              <CounterUp end={mockData.home.design_projects_completed} />
            </div>
            <p className="text-sm sm:text-base text-gray-400 font-normal">
              Design projects completed
            </p>
          </div>

          {/* Vertical Divider 1 */}
          <div className="w-full md:w-px h-px md:h-20 bg-white/10 my-4 md:my-0"></div>

          {/* Stat 2: Client Satisfaction */}
          <div className="flex flex-col items-center justify-center w-full p-4">
            <div className="text-5xl sm:text-6xl font-semibold text-white mb-2 tracking-tight">
              <CounterUp end={mockData.home.client_satisfaction_rate} />%
            </div>
            <p className="text-sm sm:text-base text-gray-400 font-normal">
              Client satisfaction rate
            </p>
          </div>
          
          {/* Vertical Divider 2 */}
          <div className="w-full md:w-px h-px md:h-20 bg-white/10 my-4 md:my-0"></div>

          {/* Stat 3: Years of Experience */}
          <div className="flex flex-col items-center justify-center w-full p-4">
            <div className="text-5xl sm:text-6xl font-semibold text-white mb-2 tracking-tight">
              <CounterUp end={mockData.home.years_of_experience} />
            </div>
            <p className="text-sm sm:text-base text-gray-400 font-normal">
              Years of experience
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;


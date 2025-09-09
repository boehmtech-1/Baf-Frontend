import React, { useState, useEffect, useRef } from 'react';

const SpiralComponent = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  const brandItems = [
    { id: 1, name: 'Cairo', imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2940&auto.format&fit=crop' },
    { id: 2, name: 'Manila', imageUrl: 'https://images.unsplash.com/photo-1615800049089-094119d80d21?q=80&w=2940&auto.format&fit=crop' },
    { id: 3, name: 'Tokyo', imageUrl: 'https://images.unsplash.com/photo-1596706914588-4660e53f1f7d?q=80&w=2940&auto.format&fit=crop' },
    { id: 4, name: 'Paris', imageUrl: 'https://images.unsplash.com/photo-1620869502150-137a1fb79536?q=80&w=2866&auto.format&fit=crop' },
    { id: 5, name: 'Oslo', imageUrl: 'https://images.unsplash.com/photo-1618221195794-dd891960b83d?q=80&w=2940&auto.format&fit=crop' },
    { id: 6, name: 'London', imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a7eb9f38f?q=80&w=2940&auto.format&fit=crop' },
    { id: 7, name: 'Berlin', imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2940&auto.format&fit=crop' },
    { id: 8, name: 'Rome', imageUrl: 'https://images.unsplash.com/photo-1615800049089-094119d80d21?q=80&w=2940&auto.format&fit=crop' },
  ];
  
  const NUM_ITEMS = brandItems.length;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const { top, height } = rect;
        const windowHeight = window.innerHeight;
        
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - top) / (windowHeight + height)));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- REFACTORED LOGIC ---

  // 1. The Cylinder's Rotation (Parent)
  const getCylinderTransform = (progress) => {
    // Rotate the entire cylinder to bring the next card to the front.
    const totalRotation = 360 * ((NUM_ITEMS - 1) / NUM_ITEMS);
    const currentRotation = progress * totalRotation;
    
    return {
      transform: `rotateY(-${currentRotation}deg)`,
      transformStyle: 'preserve-3d',
    };
  };

  // 2. The Snake's Climb (Individual Cards)
  const getCardStyle = (index, progress, parentRotation) => {
    // --- Static placement on the cylinder ---
    const angle = (360 / NUM_ITEMS) * index;
    const radius = 400; // Radius of the cylinder

    // --- Dynamic vertical movement ---
    const verticalSpacing = 150; // Vertical distance between cards in px
    const totalSnakeHeight = verticalSpacing * (NUM_ITEMS - 1);
    
    // This calculation makes each card move up, pass the center, and continue up.
    // At progress=0, card 0 is at y=0.
    const yOffset = -index * verticalSpacing;
    const scrollYOffset = progress * totalSnakeHeight;
    const currentY = yOffset + scrollYOffset;
    
    // --- Proximity effects (Blur, Scale, Opacity) ---
    // A card is "in focus" only when it's at the front AND vertically centered.
    
    // a) Proximity to the front of the rotation (1 = front, -1 = back)
    const cardAngleRelativeToViewer = (parentRotation + angle + 360) % 360;
    const rotationProximity = Math.cos(cardAngleRelativeToViewer * Math.PI / 180);

    // b) Proximity to the vertical center (1 = center, 0 = far)
    const verticalProximity = Math.max(0, 1 - Math.abs(currentY) / (window.innerHeight / 2));
    
    // c) Combine proximities: a card must be both rotationally and vertically close to be in focus.
    const combinedProximity = Math.max(0, rotationProximity) * verticalProximity;

    const scale = 1 + 0.3 * combinedProximity;
    const opacity = 0.4 + 0.6 * combinedProximity;
    const blur = (1 - combinedProximity) * 10;
    const zIndex = Math.floor(combinedProximity * 100);

    return {
      transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${currentY}px) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      filter: `blur(${blur}px)`,
      transition: 'filter 0.1s linear',
    };
  };

  const cylinderTransformStyle = getCylinderTransform(scrollY);
  const parentRotation = parseFloat(cylinderTransformStyle.transform.match(/rotateY\(([^deg]+)deg\)/)?.[1] || '0');

  return (
    <div className="bg-black py-20 min-h-[400vh]"> {/* Even more scroll height */}
      <div className="text-center mb-60"> {/* Pushed down to give space for animation start */}
        <h2 className="text-4xl md:text-6xl font-light text-white tracking-wide">
          Brands
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative h-screen"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
      >
        <div 
          className="absolute w-full h-full top-0 left-0"
          style={cylinderTransformStyle}
        >
          {brandItems.map((item, index) => (
            <div
              key={item.id}
              className="absolute top-1/2 left-1/2 -mt-[150px] -ml-[150px] w-[300px] h-[300px] rounded-2xl shadow-2xl overflow-hidden"
              style={getCardStyle(index, scrollY, parentRotation)}
            >
              <div className="w-full h-full relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-semibold text-3xl tracking-wider">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpiralComponent;
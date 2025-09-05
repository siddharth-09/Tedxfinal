import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

type Member = {
  name: string;
  role?: string;
  department?: string;
  imageUrl: string;
};

type TeamGalleryProps = {
  title: string;
  members: Member[];
};

export default function TeamGallery({ title, members }: TeamGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  
  // State for responsive card dimensions
  const [cardDimensions, setCardDimensions] = useState({ width: 360, height: 480 });

  // Update card dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width >= 1024) {
        // Desktop
        setCardDimensions({ width: 540, height: 720 });
      } else if (width >= 640) {
        // Tablet
        setCardDimensions({ width: 400, height: 533 });
      } else {
        // Mobile
        setCardDimensions({ width: 360, height: 480 });
      }
    };

    // Set initial dimensions
    updateDimensions();

    // Add event listener for window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Mouse drag handlers for desktop
  function handleMouseDown(e: React.MouseEvent) {
    if (!containerRef.current) return;
    
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = containerRef.current.scrollLeft;
    
    // Add visual feedback
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.scrollBehavior = 'auto'; // Disable smooth scroll during drag
    
    // Prevent text selection
    e.preventDefault();
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !containerRef.current) return;
    
    e.preventDefault();
    
    const x = e.clientX;
    const walk = (x - startX.current) * 1.5; // Multiply by 1.5 for faster scrolling
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  }

  function handleMouseUp() {
    if (!containerRef.current) return;
    
    isDragging.current = false;
    containerRef.current.style.cursor = 'grab';
    containerRef.current.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
  }

  function handleMouseLeave() {
    if (!containerRef.current) return;
    
    isDragging.current = false;
    containerRef.current.style.cursor = 'grab';
    containerRef.current.style.scrollBehavior = 'smooth';
  }

  // Prevent click events when dragging
  function handleClick(e: React.MouseEvent) {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  // Touch handlers for mobile
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  function handleTouchStart(e: React.TouchEvent) {
    if (!containerRef.current) return;
    
    touchStartX.current = e.touches[0].clientX;
    touchScrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.scrollBehavior = 'auto';
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!containerRef.current) return;
    
    const x = e.touches[0].clientX;
    const walk = (x - touchStartX.current) * 1.2;
    containerRef.current.scrollLeft = touchScrollLeft.current - walk;
  }

  function handleTouchEnd() {
    if (!containerRef.current) return;
    containerRef.current.style.scrollBehavior = 'smooth';
  }

  return (
    <section className="team-gallery-section">
      <h2 className="group-title">{title}</h2>
      <div
        ref={containerRef}
        className="carousel-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          cursor: 'grab', 
          userSelect: 'none',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="carousel-track">
          {members.map((member, idx) => (
            <div 
              key={idx} 
              className="carousel-slide" 
              style={{ 
                width: cardDimensions.width, 
                height: cardDimensions.height 
              }}
              onDragStart={(e) => e.preventDefault()} // Prevent image drag
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={cardDimensions.width}
                height={cardDimensions.height}
                className="card-image"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  pointerEvents: 'none' // Prevent image drag interference
                }}
                priority={true}
                draggable={false} // Disable image dragging
                sizes={`(max-width: 640px) 360px, (max-width: 1024px) 400px, 540px`}
              />
              <div className="image-text">
                <h3>{member.name}</h3>
                <p>{member.role ? `${member.role} | ` : ''}{member.department || ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
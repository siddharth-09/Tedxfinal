// Bento.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import "@/styles/Bento.css";

type BentoImages = {
  [key: string]: string; // e.g. 'col-1-row-1': '/images/1.jpg'
};

export default function Bento({ images }: { images: BentoImages }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices and screen size changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced drag sensitivity based on device type
  const getDragMultiplier = useCallback(() => {
    if (isMobile) return 1.5; // More sensitive on mobile
    return 2; // Standard desktop sensitivity
  }, [isMobile]);

  // Mouse down handler - start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    // Add grabbing cursor
    scrollContainerRef.current.style.cursor = 'grabbing';
    
    // Prevent text selection
    e.preventDefault();
  };

  // Mouse leave handler - stop dragging
  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  // Mouse up handler - stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  // Mouse move handler - perform scrolling
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * getDragMultiplier();
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    // Prevent default to avoid scrolling issues
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * getDragMultiplier();
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    
    // Prevent default to avoid page scrolling
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Prevent context menu on long press (mobile)
  const handleContextMenu = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
    }
  };

  // Set initial cursor style
  useEffect(() => {
    if (scrollContainerRef.current && !isMobile) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  }, [isMobile]);

  // Render cards based on screen size
  const renderCards = () => {
    const allCards = [
      { key: "col-1-row-1", className: "bento-card col-1 row-1" },
      { key: "col-1-row-2", className: "bento-card col-1 row-2" },
      { key: "col-2-row-1", className: "bento-card col-2 row-1" },
      { key: "col-2-row-2", className: "bento-card col-2 row-2" },
      { key: "col-3-row-1-2", className: "bento-card col-3 row-1-2" },
      { key: "col-4-row-1", className: "bento-card col-4 row-1" },
      { key: "col-4-row-2", className: "bento-card col-4 row-2" },
      { key: "col-5-row-1", className: "bento-card col-5 row-1" },
      { key: "col-5-row-2", className: "bento-card col-5 row-2" },
      { key: "col-6-row-1", className: "bento-card col-6 row-1" },
      { key: "col-6-row-2", className: "bento-card col-6 row-2" },
      { key: "col-7-row-1", className: "bento-card col-7 row-1" },
      { key: "col-7-row-2", className: "bento-card col-7 row-2" },
      { key: "col-8-row-1-2", className: "bento-card col-8 row-1-2" },
    ];

    return allCards.map(({ key, className }) => (
      <div key={key} className={className}>
        <Image
          src={images[key]}
          alt="#"
          fill
          style={{ objectFit: "cover" }}
          draggable={false}
          sizes="(max-width: 379px) 110px, (max-width: 479px) 130px, (max-width: 599px) 160px, (max-width: 767px) 200px, (max-width: 991px) 260px, (max-width: 1199px) 320px, (max-width: 1439px) 400px, (max-width: 1919px) 480px, 640px"
        />
      </div>
    ));
  };

  return (
    <div className="bento-wrapper">
      <div className="FogContainer">
        <div className="Fog"></div>
      </div>
      <div 
        ref={scrollContainerRef}
        className={`bento-scrollable ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onContextMenu={handleContextMenu}
        style={{
          cursor: isMobile ? 'default' : (isDragging ? 'grabbing' : 'grab')
        }}
      >
        <div className="bento-grid">
          {renderCards()}
        </div>
      </div>
    </div>
  );
}
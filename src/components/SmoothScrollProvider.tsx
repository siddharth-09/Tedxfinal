'use client'

import React from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    smooth?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
    autoRaf?: boolean;
  };
}

export default function SmoothScrollProvider({ 
  children, 
  options = {} 
}: SmoothScrollProviderProps) {
  const defaultOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical' as const,
    smooth: true,
    smoothTouch: false, // Disable on mobile for better performance
    touchMultiplier: 2,
    infinite: false,
    autoRaf: true,
    ...options
  };

  return (
    <ReactLenis 
      root 
      options={defaultOptions}
    >
      {children}
    </ReactLenis>
  );
}
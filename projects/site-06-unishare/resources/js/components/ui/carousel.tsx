"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode;
  visibleItems?: number;
}

export function Carousel({ children, visibleItems = 4 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const items = React.Children.toArray(children);
  const totalItems = items.length;
  
  // Calculate how many items we can actually show
  const actualVisibleItems = Math.min(visibleItems, totalItems);
  const itemWidth = 100 / actualVisibleItems;

  const next = () => {
    setCurrentIndex((prev) => 
      prev >= totalItems - actualVisibleItems ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? totalItems - actualVisibleItems : prev - 1
    );
  };

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ 
          transform: `translateX(-${currentIndex * itemWidth}%)`,
          width: `${totalItems * itemWidth}%`
        }}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 px-2"
            style={{ width: `${itemWidth}%` }}
          >
            {item}
          </div>
        ))}
      </div>
      
      {totalItems > actualVisibleItems && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}

export function CarouselContent({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full">{children}</div>;
}

export function CarouselItem({ children }: { children: React.ReactNode }) {
  return <div className="h-full">{children}</div>;
}
import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

// Configuration - adjust horizontal scroll range here
const HORIZONTAL_SCROLL_CONFIG = {
  // maxOffset and initialOffset are calculated dynamically based on viewport width
  transitionSpeed: 0.05,
  scrollDeltaScale: 0.01, // Scale factor for scroll to movement conversion
  recapSection: {
    start: 0.25,
    end: 0.25,
    entryBuffer: 0.08,
  },
};

// Shared state for HTML components to access the offset
// Initial value will be set when hook initializes
let sharedHorizontalOffset = 0;
const offsetListeners = new Set();

const setSharedOffset = (value) => {
  sharedHorizontalOffset = value;
  offsetListeners.forEach((listener) => listener(value));
};

export const getHorizontalOffset = () => sharedHorizontalOffset;

export const subscribeToHorizontalOffset = (callback) => {
  offsetListeners.add(callback);
  return () => offsetListeners.delete(callback);
};

export const useHorizontalScroll = () => {
  const scroll = useScroll();
  const { viewport } = useThree();
  const { transitionSpeed, scrollDeltaScale, recapSection } =
    HORIZONTAL_SCROLL_CONFIG;

  // Calculate maxOffset and initialOffset dynamically based on screen width (viewport width)
  const maxOffset = viewport.width * 1.5;
  const initialOffset = viewport.width * 1.5;

  const [isHorizontalMode, setIsHorizontalMode] = useState(false);
  const [horizontalOffset, setHorizontalOffset] = useState(initialOffset);
  const targetHorizontalOffset = useRef(initialOffset);
  const lastScrollOffset = useRef(0); // Tracks scroll progress (0-1), not horizontal offset
  const scrollDirection = useRef(null);
  const scrollDirectionHorizontal = useRef(null);
  const lastScrollTime = useRef(Date.now());

  // Sync initial value to shared state
  useEffect(() => {
    setSharedOffset(initialOffset);
  }, [initialOffset]);

  useEffect(() => {
    const handleWheel = (event) => {
      if (isHorizontalMode) {
        event.preventDefault();
        event.stopPropagation();

        const deltaY = event.deltaY;
        const currentOffset = targetHorizontalOffset.current;
        const horizontalDelta = -deltaY * scrollDeltaScale;

        scrollDirectionHorizontal.current = deltaY > 0 ? "right" : "left";

        // Clamp to max/min offset range
        targetHorizontalOffset.current = Math.max(
          -maxOffset,
          Math.min(maxOffset, currentOffset + horizontalDelta)
        );

        return false;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isHorizontalMode, maxOffset, scrollDeltaScale]);

  useFrame(() => {
    if (!scroll || !scroll.offset) return;

    const scrollProgress = scroll.offset;
    const currentTime = Date.now();

    // Track scroll direction
    if (scrollProgress > lastScrollOffset.current) {
      scrollDirection.current = "down";
    } else if (scrollProgress < lastScrollOffset.current) {
      scrollDirection.current = "up";
    }

    lastScrollOffset.current = scrollProgress;
    lastScrollTime.current = currentTime;

    // Check if we're in the Recap section
    const { start, end, entryBuffer } = recapSection;
    const inRecapSection =
      scrollProgress > start - entryBuffer &&
      scrollProgress < end + entryBuffer;

    if (inRecapSection) {
      // Exit horizontal mode if at boundaries
      const atLeftBoundary =
        scrollDirectionHorizontal.current === "left" &&
        scrollDirection.current !== "down" &&
        horizontalOffset >= maxOffset - 0.1;

      const atRightBoundary =
        scrollDirectionHorizontal.current === "right" &&
        scrollDirection.current !== "up" &&
        horizontalOffset <= -maxOffset + 0.1;

      if (atLeftBoundary || atRightBoundary) {
        setIsHorizontalMode(false);
      } else {
        setIsHorizontalMode(true);
        const target = scroll.el.scrollHeight * 0.24;
        scroll.el.scrollTo({ top: target, behavior: "instant" });
        scrollDirection.current = null;
      }
    }

    // Smooth horizontal movement animation
    if (isHorizontalMode) {
      const currentOffset = horizontalOffset;
      const targetOffset = targetHorizontalOffset.current;

      if (Math.abs(targetOffset - currentOffset) > 0.01) {
        const newOffset =
          currentOffset + (targetOffset - currentOffset) * transitionSpeed;
        setHorizontalOffset(newOffset);
        setSharedOffset(newOffset);
      }
    }
  });

  return {
    isHorizontalMode,
    horizontalOffset,
    maxHorizontalOffset: maxOffset,
  };
};

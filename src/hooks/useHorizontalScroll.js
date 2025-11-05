import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

export const useHorizontalScroll = () => {
  const scroll = useScroll();
  const [isHorizontalMode, setIsHorizontalMode] = useState(false);
  const [horizontalOffset, setHorizontalOffset] = useState(20);
  const targetHorizontalOffset = useRef(20);
  const transitionSpeed = 0.05;
  const maxHorizontalOffset = 20; // Maximum horizontal movement distance
  const lastScrollOffset = useRef(20);
  const scrollDirection = useRef(null); // Track current scroll direction
  const scrollDirectionHorizontal = useRef(null); // Track current scroll direction
  const scrollVelocity = useRef(0); // Track scroll velocity for momentum
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const handleWheel = (event) => {
      // Always track accumulated wheel delta for momentum calculation
      if (isHorizontalMode) {
        event.preventDefault();
        event.stopPropagation();
        const deltaY = event.deltaY;
        const currentOffset = targetHorizontalOffset.current;

        // Convert vertical scroll to horizontal scene movement
        const horizontalDelta = -deltaY * 0.01; // Scale factor for horizontal movement
        if (deltaY > 0) {
          scrollDirectionHorizontal.current = "right";
        } else {
          scrollDirectionHorizontal.current = "left";
        }
        // Update target horizontal offset with boundary clamping
        targetHorizontalOffset.current = Math.max(
          -maxHorizontalOffset,
          Math.min(maxHorizontalOffset, currentOffset + horizontalDelta)
        );

        // Always prevent vertical scrolling in horizontal mode

        return false;
      }
    };

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isHorizontalMode, maxHorizontalOffset]);

  useFrame(() => {
    // Decay accumulated wheel delta over time (for momentum)
    // Check if scroll is available (ScrollControls context)
    if (!scroll || !scroll.offset) {
      return;
    }

    // Get scroll progress from ScrollControls
    const scrollProgress = scroll.offset;

    // Track scroll direction and velocity
    const currentTime = Date.now();
    const timeDelta = currentTime - lastScrollTime.current;

    if (timeDelta > 0) {
      const scrollDelta = scrollProgress - lastScrollOffset.current;
      scrollVelocity.current = scrollDelta / timeDelta; // pixels per millisecond
    }

    if (scrollProgress > lastScrollOffset.current) {
      scrollDirection.current = "down";
    } else if (scrollProgress < lastScrollOffset.current) {
      scrollDirection.current = "up";
    }

    lastScrollOffset.current = scrollProgress;
    lastScrollTime.current = currentTime;

    // Define the Recap3D section range (approximately pages 2-3)
    const recapStart = 0.55; // Start of Recap3D section
    const recapEnd = 0.65; // End of Recap3D section
    const entryBuffer = 0.1; // Increased buffer to prevent drift past boundaries

    if (
      scrollProgress > recapStart - entryBuffer &&
      scrollProgress < recapEnd + entryBuffer
    ) {
      // We're in the Recap3D section - enable horizontal scrolling
      console.log(isHorizontalMode, scrollDirection);

      if (
        (scrollDirectionHorizontal.current == "left" &&
          scrollDirection.current != "down" &&
          horizontalOffset >= maxHorizontalOffset - 0.1) ||
        (scrollDirectionHorizontal.current == "right" &&
          scrollDirection.current != "up" &&
          horizontalOffset <= -maxHorizontalOffset + 0.1)
      ) {
        setIsHorizontalMode(false);
      } else {
        setIsHorizontalMode(true);
        const target = scroll.el.scrollHeight * 0.51;
        scroll.el.scrollTo({ top: target, behavior: "instant" });
        scrollDirection.current = null;
      }
    }

    // Smooth scene movement animation (only when already in horizontal mode)
    if (isHorizontalMode) {
      // Only apply smooth transition if we're already positioned and scrolling
      const currentOffset = horizontalOffset;
      const targetOffset = targetHorizontalOffset.current;

      // Only smooth transition if there's a difference (user is scrolling)
      if (Math.abs(targetOffset - currentOffset) > 0.01) {
        const newOffset =
          currentOffset + (targetOffset - currentOffset) * transitionSpeed;
        setHorizontalOffset(newOffset);
      }
    }
  });

  return {
    isHorizontalMode,
    horizontalOffset,
    maxHorizontalOffset,
  };
};

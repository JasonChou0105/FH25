// ScrollController.jsx
import { useScroll } from "@react-three/drei";
import { useEffect } from "react";

export let scrollApi = null;

export default function ScrollController() {
  const scroll = useScroll();
  useEffect(() => {
    scrollApi = scroll;
  }, [scroll]);
  return null;
}
